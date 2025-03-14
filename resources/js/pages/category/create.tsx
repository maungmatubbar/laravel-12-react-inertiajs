import React from 'react';
import { BreadcrumbItem } from '@/types';
import AppLayout from '@/layouts/app-layout';
import { Head, Link, router, useForm } from '@inertiajs/react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Category',
        href: '/categories',
    },
];

const Create = () => {
    const { data, setData, errors, post, reset, processing } = useForm({
        name: '',
        description: '',                        
    });

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        post(route('categories.store'), {
            onSuccess: () => reset(),
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Category Create" />
            <div className="flex flex-col gap-4 p-4 container mx-auto bg-gray-50 h-screen">
                <Card className="border-0 shadow-none">
                    <CardContent>
                        <div className="flex items-center justify-between">
                            <h3>Category List</h3>
                            <Button variant="outline" className="mt-2" onClick={() => router.visit(route('categories.index'))}>
                                <Link href={'/categories'}>Back</Link>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
                <Card className="border-0 shadow-none">
                    <CardContent>
                        <form onSubmit={handleSubmit} method='post'>
                            <div className="flex flex-col max-w-2xl mx-auto">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium leading-6 text-gray-900">
                                        Category Name
                                    </label>
                                    <div className="mt-2">
                                        <Input
                                            type="text"
                                            name="name"
                                            id="name"
                                            value={data.name}
                                            onChange={(e) => setData('name', e.target.value)}
                                            autoComplete="name"
                                        />
                                        {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                                    </div>
                                    <div className='mt-2'>
                                        <label htmlFor="description" className='block text-sm font-medium leading-6 text-gray-900'>Description</label>
                                        <div>
                                            <Textarea 
                                                value={data.description}
                                                onChange={(e) => setData('description', e.target.value)}
                                                name="description"
                                                id="description"
                                            />
                                            {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
                                        </div>
                                    </div>
                                    <Button className="mt-2 cursor-pointer" type="submit" disabled={processing}>
                                        {processing ? 'Creating...' : 'Create Category'}
                                    </Button>
                                </div>                                                                                
                            </div>
                        </form>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
};

export default Create;
