import React from 'react';
import { Head, usePage, Link } from '@inertiajs/react'; // Inertia helpers
import { Inertia } from '@inertiajs/inertia'; // For making Inertia requests (delete, post, etc.)

export default function Index() {
    // ✅ Destructure props from Inertia page
    // `products` is the array of all products passed from the backend
    // `flash` contains flash messages (success or error) passed from Laravel session
    const { products, flash } = usePage().props;

    // ✅ Function to handle product deletion
    const destroy = (e) => {
        // Confirm before deleting
        if (confirm("Are you sure you want to delete this product?")) {
            // Send DELETE request using Inertia
            Inertia.delete(route("products.destroy", e.currentTarget.id));
        }
    };

    return (
        <div className="container mx-auto py-12 px-4">
            {/* ✅ Set the page title for SEO & browser tab */}
            <Head title="Products" />

            {/* ✅ Flash Success Message */}
            {flash?.success && (
                <div className="mb-6 p-4 text-green-800 bg-green-200 border border-green-400 rounded-lg">
                    {flash.success} {/* Display the success message */}
                </div>
            )}

            {/* ✅ Header Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-4 sm:mb-0">
                    Products
                </h2>

                {/* ✅ Link to create a new product */}
                <Link
                    href={route("products.create")}
                    className="inline-block px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
                >
                    + Create Product
                </Link>
            </div>

            {/* ✅ Products Table */}
            <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
                <table className="min-w-full divide-y divide-gray-200">
                    {/* Table Head */}
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                ID
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Name
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Detail
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Price
                            </th>
                            <th className="px-6 py-3 text-left text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Status
                            </th>
                            <th className="px-6 py-3 text-center text-sm font-medium text-gray-700 uppercase tracking-wider">
                                Action
                            </th>
                        </tr>
                    </thead>

                    {/* Table Body */}
                    <tbody className="bg-white divide-y divide-gray-200">
                        {/* ✅ Check if products exist */}
                        {products.length > 0 ? (
                            products.map(({ id, name, detail, price, status }) => (
                                <tr key={id} className="hover:bg-gray-50 transition duration-150">
                                    <td className="px-6 py-4 text-sm text-gray-700">{id}</td>
                                    <td className="px-6 py-4 text-sm text-gray-800 font-medium">{name}</td>
                                    <td className="px-6 py-4 text-sm text-gray-600">{detail}</td>
                                    <td className="px-6 py-4 text-sm text-gray-700">{price}</td>

                                    {/* ✅ Status with conditional color */}
                                    <td className={`px-6 py-4 text-sm font-semibold ${
                                        status === 'active' ? 'text-green-600' : 'text-red-600'
                                    }`}>
                                        {/* Capitalize first letter */}
                                        {status.charAt(0).toUpperCase() + status.slice(1)}
                                    </td>

                                    {/* ✅ Action buttons */}
                                    <td className="px-6 py-4 text-center">
                                        <div className="flex justify-center gap-2 flex-wrap">
                                            {/* Show Product Details */}
                                            <Link
                                                href={route("products.show", id)}
                                                className="px-4 py-2 text-sm bg-gray-600 text-white rounded-lg shadow hover:bg-gray-700 transition duration-300"
                                            >
                                                Show
                                            </Link>

                                            {/* Edit Product */}
                                            <Link
                                                href={route("products.edit", id)}
                                                className="px-4 py-2 text-sm bg-blue-600 text-white rounded-lg shadow hover:bg-blue-700 transition duration-300"
                                            >
                                                Edit
                                            </Link>

                                            {/* Delete Product */}
                                            <button
                                                id={id}
                                                onClick={destroy}
                                                className="px-4 py-2 text-sm bg-red-600 text-white rounded-lg shadow hover:bg-red-700 transition duration-300"
                                            >
                                                Delete
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            // ✅ Show this when no products exist
                            <tr>
                                <td colSpan="6" className="px-6 py-4 text-center text-gray-500">
                                    No products found.
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
}
