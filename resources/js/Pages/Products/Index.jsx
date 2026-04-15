import React from 'react';
import { Head, usePage, Link, router } from '@inertiajs/react';
import { Inertia } from '@inertiajs/inertia';

export default function Index() {

    const { products, flash, filters } = usePage().props;

    const destroy = (e) => {
        if (confirm("Are you sure?")) {
            Inertia.delete(route("products.destroy", e.currentTarget.id));
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();

        router.get('/products', {
            search: e.target.search.value,
            min_price: e.target.min_price.value,
            max_price: e.target.max_price.value,
        });
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            <Head title="Products" />

            {/* ✅ Flash */}
            {flash?.success && (
                <div className="mb-4 p-3 bg-green-100 text-green-700 rounded shadow">
                    {flash.success}
                </div>
            )}

            {/* ✅ Header */}
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Products</h1>

                <Link
                    href={route("products.create")}
                    className="bg-green-600 hover:bg-green-700 text-white px-5 py-2 rounded-lg shadow"
                >
                    + Add Product
                </Link>
            </div>

            {/* ✅ Search Card */}
            <div className="bg-white p-4 rounded-xl shadow mb-6">
                <form onSubmit={handleSearch} className="flex flex-wrap gap-3">

                    <input
                        type="text"
                        name="search"
                        placeholder="🔍 Search product..."
                        defaultValue={filters?.search || ""}
                        className="border px-4 py-2 rounded w-60"
                    />

                    <input
                        type="number"
                        name="min_price"
                        placeholder="Min ₹"
                        defaultValue={filters?.min_price || ""}
                        className="border px-4 py-2 rounded w-32"
                    />

                    <input
                        type="number"
                        name="max_price"
                        placeholder="Max ₹"
                        defaultValue={filters?.max_price || ""}
                        className="border px-4 py-2 rounded w-32"
                    />

                    <button className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded">
                        Apply
                    </button>
                </form>
            </div>

            {/* ✅ Table Card */}
            <div className="bg-white rounded-xl shadow overflow-hidden">
                <table className="w-full text-sm">
                    <thead className="bg-gray-200 text-gray-700">
                        <tr>
                            <th className="p-3 text-left">ID</th>
                            <th className="p-3 text-left">Name</th>
                            <th className="p-3 text-left">Detail</th>
                            <th className="p-3 text-left">Price</th>
                            <th className="p-3 text-left">Status</th>
                            <th className="p-3 text-center">Action</th>
                        </tr>
                    </thead>

                    <tbody>
                        {products.data.length > 0 ? (
                            products.data.map((p) => (
                                <tr key={p.id} className="border-t hover:bg-gray-50">

                                    <td className="p-3">{p.id}</td>

                                    <td className="p-3 font-medium text-gray-800">
                                        {p.name}
                                    </td>

                                    <td className="p-3 text-gray-600">
                                        {p.detail}
                                    </td>

                                    <td className="p-3 text-blue-600 font-semibold">
                                        ₹{p.price}
                                    </td>

                                    <td className="p-3">
                                        <span className={`px-2 py-1 rounded text-xs font-bold ${
                                            p.status === 'active'
                                                ? 'bg-green-100 text-green-700'
                                                : 'bg-red-100 text-red-600'
                                        }`}>
                                            {p.status}
                                        </span>
                                    </td>

                                    <td className="p-3 text-center space-x-2">
                                        <Link
                                            href={route("products.show", p.id)}
                                            className="bg-gray-600 text-white px-3 py-1 rounded"
                                        >
                                            View
                                        </Link>

                                        <Link
                                            href={route("products.edit", p.id)}
                                            className="bg-blue-600 text-white px-3 py-1 rounded"
                                        >
                                            Edit
                                        </Link>

                                        <button
                                            id={p.id}
                                            onClick={destroy}
                                            className="bg-red-600 text-white px-3 py-1 rounded"
                                        >
                                            Delete
                                        </button>
                                    </td>

                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="6" className="text-center p-5 text-gray-500">
                                    No products found 😔
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* ✅ Pagination */}
            <div className="mt-6 flex flex-wrap gap-2 justify-center">
                {products.links.map((link, i) => (
                    <button
                        key={i}
                        disabled={!link.url}
                        onClick={() => router.get(link.url)}
                        dangerouslySetInnerHTML={{ __html: link.label }}
                        className={`px-3 py-1 rounded border ${
                            link.active ? 'bg-blue-600 text-white' : 'bg-white'
                        }`}
                    />
                ))}
            </div>
        </div>
    );
}