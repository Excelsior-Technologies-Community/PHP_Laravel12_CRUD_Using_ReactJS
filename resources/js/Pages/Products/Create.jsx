import React from 'react';
import { Head, useForm, Link } from '@inertiajs/react'; 
// Head: Set page title
// useForm: Inertia hook for handling form data & submission
// Link: SPA navigation (like <a> but without full page reload)

export default function Create() {
    // ✅ Initialize the form data and methods
    // `data` holds all form input values
    // `setData` updates form values
    // `post` sends POST request to Laravel route
    // `errors` contains validation errors from backend
    const { data, setData, post, errors } = useForm({
        name: "",       // Product name
        detail: "",     // Product detail/description
        price: "",      // Product price
        status: "active", // Default status
    });

    // ✅ Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault(); // Prevent default HTML form submission
        post(route("products.store")); // Send POST request to store product
    }

    return (
        <div className="container mx-auto py-12 px-4">
            {/* ✅ Set the page title in browser tab */}
            <Head title="Create Product" />

            {/* ✅ Header with centered title and Back button */}
            <div className="relative mb-8">
                <h2 className="text-3xl font-bold text-gray-800 text-center">
                    Create Product
                </h2>
                {/* Back button to return to products list */}
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
                {/* Form submission handled by handleSubmit */}
                <form onSubmit={handleSubmit} className="space-y-6">

                    {/* Product Name */}
                    <div>
                        <label className="block text-gray-700 font-medium mb-2">Name</label>
                        <input
                            type="text"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            value={data.name} // Bind input to form data
                            onChange={(e) => setData("name", e.target.value)} // Update value on change
                        />
                        {/* Display validation error */}
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
                            Save Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
