import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link, router, useForm, usePage } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';
import { useEffect, useState } from 'react';

// Define types for categories and pagination
interface Category {
    id: number;
    name: string;
    description: string;
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface CategoryProps {
    categories: {
        data: Category[];
        links: PaginationLink[];
        total: number;
        current_page: number;
    };
    filters: {
        search?: string;
        page?: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category List',
        href: '/categories',
    },
];

const Index = () => {
    const { categories, filters } = usePage<CategoryProps>().props;
    const { delete: destroy } = useForm();
    const [search, setSearch] = useState<string>(filters.search || '');

    // Debounced Search Handling
    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            router.get(route('categories.index'), { search, page: 1 }, { preserveState: true, replace: true });
        }, 500); // 500ms debounce delay

        return () => clearTimeout(delayDebounceFn);
    }, [search]);

    // Delete Category
    const handleDelete = (id: number) => {
        if (confirm('Are you sure you want to delete this?')) {
            destroy(route('categories.destroy', id));
        }
    };

    // Handle Pagination Clicks
    const handlePagination = (url: string | null) => {
        if (url) {
            router.get(url, { search }, { preserveState: true, replace: true });
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="container mx-auto flex h-full flex-col gap-4 bg-gray-50 p-4">
                <Card className="border-0 shadow-none">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <h3>Category List</h3>
                            <Button className="mt-2">
                                <Link href={route('categories.create')}>Add Category</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>

                {/* Search Bar */}
                <div className="w-full overflow-x-auto">
                    <div className="my-3 flex items-center justify-between">
                        <div>Total: {categories.total || 0}</div>
                        <div>
                            <Input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} />
                        </div>
                    </div>

                    {/* Category Table */}
                    <div className="min-w-full rounded-lg border border-gray-200 bg-white shadow-sm">
                        <div className="grid grid-cols-3 bg-gray-100 p-3 font-semibold text-gray-700">
                            <div className="p-2">Category Name</div>
                            <div className="p-2">Description</div>
                            <div className="p-2 text-right">Actions</div>
                        </div>
                        {categories?.data.map((category) => (
                            <div key={category.id} className="grid grid-cols-3 items-center border-t border-gray-200 p-3">
                                <div className="p-2">{category.name}</div>
                                <div className="p-2 text-gray-600">{category.description}</div>
                                <div className="flex justify-end gap-2 p-2">
                                    <Link href={route('categories.edit', category.id)}>
                                        <Button variant="outline" size="icon">
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                    </Link>
                                    <Button onClick={() => handleDelete(category.id)} variant="destructive" size="icon">
                                        <Trash className="h-4 w-4" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* Pagination */}
                    <div className="pagination my-2 flex justify-center space-x-2">
                        {categories?.links.map((link, index) => (
                            <button
                                key={index}
                                onClick={() => link.url && handlePagination(link.url)}
                                className={`rounded border px-3 py-1 ${
                                    link.active ? 'bg-gray-700 text-white cursor-pointer' : 'bg-white hover:bg-gray-300 cursor-pointer'
                                } ${!link.url ? 'cursor-not-allowed bg-gray-200 text-gray-500' : ''}`}
                                dangerouslySetInnerHTML={{ __html: link.label }}
                                disabled={!link.url} 
                            />
                        ))}
                    </div>
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
