import React from 'react';
import { Head, Link, usePage, router } from '@inertiajs/react';

export default function Index({ categories }) {
    const { flash } = usePage().props;

    const handleDelete = (id) => {
        if (confirm("Are you sure you want to delete this category?")) {
            router.delete(route('categories.destroy', id));
        }
    };

    return (
        <div className="container mx-auto py-10 px-4">
            <Head title="Categories List" />

            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-extrabold text-gray-800">Categories</h1>
                <Link
                    href={route('categories.create')}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 rounded-lg shadow-md transition duration-300 flex items-center"
                >
                    <span className="mr-2">+</span> Add Category
                </Link>
            </div>

            {flash.success && (
                <div className="mb-4 p-4 bg-green-100 border-l-4 border-green-500 text-green-700 shadow-sm">
                    {flash.success}
                </div>
            )}

            <div className="bg-white shadow-xl rounded-xl overflow-hidden border border-gray-200">
                <table className="w-full text-left border-collapse">
                    <thead className="bg-gray-50 border-b border-gray-200">
                        <tr>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">ID</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase">Category Name</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-center">Status</th>
                            <th className="px-6 py-4 text-sm font-semibold text-gray-600 uppercase text-right">Actions</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100">
                        {categories.length > 0 ? (
                            categories.map((cat) => (
                                <tr key={cat.id} className="hover:bg-gray-50 transition duration-200">
                                    <td className="px-6 py-4 text-gray-700 font-medium">#{cat.id}</td>
                                    <td className="px-6 py-4 text-gray-900 font-semibold">{cat.name}</td>
                                    <td className="px-6 py-4 text-center">
                                        <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase ${
                                            cat.status === 'active' 
                                            ? 'bg-green-100 text-green-700' 
                                            : 'bg-red-100 text-red-700'
                                        }`}>
                                            {cat.status}
                                        </span>
                                    </td>
                                    <td className="px-6 py-4 text-right space-x-3">
                                        <Link
                                            href={route('categories.edit', cat.id)}
                                            className="inline-block text-indigo-600 hover:text-indigo-900 font-semibold transition"
                                        >
                                            Edit
                                        </Link>
                                        <button
                                            onClick={() => handleDelete(cat.id)}
                                            className="text-red-500 hover:text-red-700 font-semibold transition"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="4" className="px-6 py-10 text-center text-gray-500">
                                    No categories found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}