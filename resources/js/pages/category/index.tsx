import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { BreadcrumbItem } from '@/types';
import { Head, Link } from '@inertiajs/react';
import { Pencil, Trash } from 'lucide-react';
const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category List',
        href: '/categories',
    },
];

interface CategoriesProps {
    id: number;
    name: string;
    description: string;
}

interface Props {
    categories: CategoriesProps[];
}

const Index = ({ categories }: Props) => {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Categories" />
            <div className="container mx-auto flex h-screen flex-col gap-4 bg-gray-50 p-4">
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

                {/* Category List as Cards */}
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3">
                    {categories?.map((category: CategoriesProps) => (
                        <Card key={category?.id} className="flex flex-col justify-between p-4">
                            <CardContent>
                                <h3 className="text-lg font-semibold">{category?.name}</h3>
                                <p className="text-muted-foreground mt-2 text-sm">{category?.description}</p>
                            </CardContent>
                            <div className="mt-4 flex justify-end gap-2">
                                <Button variant="outline" size="icon">
                                    <Pencil className="h-4 w-4" />
                                </Button>
                                <Link
                                    href={`/categories/${category?.id}`}
                                   method='delete'
                                   as='button'
                                   className='px-2 bg-red-400 rounded-sm hover:bg-red-400 cursor-pointer'
                                    onClick={(e) => {
                                        if (!confirm('Are you sure you want to delete this?')) {
                                            e.preventDefault();
                                        }
                                    }}
                                >
                                    <Trash className="h-4 w-4" />
                                </Link>
                            </div>
                        </Card>
                    ))}
                </div>
            </div>
        </AppLayout>
    );
};

export default Index;
