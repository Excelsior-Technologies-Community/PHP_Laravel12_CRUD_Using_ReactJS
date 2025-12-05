import React from 'react';
import { Head, usePage, Link, useForm } from '@inertiajs/react';

// ✅ Edit.jsx Component: Allows editing an existing product
export default function Edit() {
    // ✅ Get the product data passed from the controller via Inertia
    const { product } = usePage().props;

    // ✅ Initialize Inertia form with product's current data
    // useForm handles form state, errors, and sending requests
    const { data, setData, put, errors } = useForm({
        name: product.name || "",       // Pre-fill name
        detail: product.detail || "",   // Pre-fill detail
        price: product.price || "",     // Pre-fill price
        status: product.status || "active", // Pre-fill status
    });

    // ✅ Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default HTML form submission
        put(route("products.update", product.id)); // Send PUT request to update product
    }

    return (
        <div className="container mx-auto py-12 px-4">
            {/* ✅ Page title in browser tab */}
            <Head title="Edit Product" />

            {/* Header with centered title and Back button */}
            <div className="relative mb-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                    Edit Product
                </h2>

                {/* ✅ Back button to go back to the product listing page */}
                <div className="absolute right-0 top-0">
                    <Link
                        href={route("products.index")}
                        className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                    >
                        Back
                    </Link>
                </div>
            </div>

            {/* ✅ Form Card */}
            <div className="bg-white shadow-md rounded-lg border border-gray-200 p-8 max-w-3xl mx-auto">
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Product Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={data.name} // Bind input value to form state
                            onChange={(e) => setData("name", e.target.value)} // Update form state on change
                        />
                        {/* Display validation error if exists */}
                        {errors.name && <p className="text-red-600 mt-1">{errors.name}</p>}
                    </div>

                    {/* Product Detail */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Detail</label>
                        <textarea
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={data.detail}
                            onChange={(e) => setData("detail", e.target.value)}
                        />
                        {errors.detail && <p className="text-red-600 mt-1">{errors.detail}</p>}
                    </div>

                    {/* Product Price */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Price</label>
                        <input
                            type="number"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={data.price}
                            onChange={(e) => setData("price", e.target.value)}
                        />
                        {errors.price && <p className="text-red-600 mt-1">{errors.price}</p>}
                    </div>

                    {/* Product Status */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Status</label>
                        <select
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={data.status}
                            onChange={(e) => setData("status", e.target.value)}
                        >
                            <option value="active">Active</option>
                            <option value="inactive">Inactive</option>
                        </select>
                        {errors.status && <p className="text-red-600 mt-1">{errors.status}</p>}
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-end">
                        <button
                            type="submit"
                            className="px-6 py-2 bg-green-600 text-white font-semibold rounded-lg shadow hover:bg-green-700 transition duration-300"
                        >
                            Update Product
                        </button>
                    </div>

                </form>
            </div>
        </div>
    );
}
