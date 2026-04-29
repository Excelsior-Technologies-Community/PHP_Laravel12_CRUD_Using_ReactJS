import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react';

export default function Edit({ category }) {
    const { data, setData, put, errors, processing } = useForm({
        name: category.name || "",
        status: category.status || "active",
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        put(route("categories.update", category.id));
    };

    return (
        <div className="container mx-auto py-12 px-4">
            <Head title="Edit Category" />

            <div className="relative mb-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center">Edit Category</h2>
                <div className="absolute right-0 top-0">
                    <Link href={route("categories.index")} className="px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition">
                        Back
                    </Link>
                </div>
            </div>

            <div className="bg-white shadow-md rounded-lg border border-gray-200 p-8 max-w-2xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Category Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={data.name}
                            onChange={(e) => setData("name", e.target.value)}
                        />
                        {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Status</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="active" selected={data.status === 'active'}>Active</option>
                            <option value="inactive" selected={data.status === 'inactive'}>Inactive</option>
                        </select>
                        {errors.status && <p className="text-red-600 mt-1">{errors.status}</p>}
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="submit"
                            disabled={processing}
                            className="px-6 py-2 bg-yellow-600 text-white font-semibold rounded-lg shadow hover:bg-yellow-700 transition"
                        >
                            {processing ? 'Updating...' : 'Update Category'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}