import React from 'react';
import { Head, Link, usePage } from '@inertiajs/react';

// ✅ Show.jsx Component: Displays detailed information about a single product
export default function Show() {
    // ✅ Get the product data passed from the controller via Inertia
    const { product } = usePage().props;

    return (
        <div className="container mx-auto py-12 px-4">
            {/* ✅ Page title displayed in the browser tab */}
            <Head title={`Product: ${product.name}`} />

            {/* Header Section with Title and Back Button */}
            <div className="flex flex-col items-center justify-center mb-8">
                {/* Page Heading */}
                <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
                    Product Details
                </h2>

                {/* ✅ Back button to navigate to the Products list */}
                <Link
                    href={route("products.index")} // Route defined in web.php
                    className="inline-block px-6 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow hover:bg-blue-700 transition duration-300"
                >
                    Back to Products
                </Link>
            </div>

            {/* ✅ Product Card */}
            <div className="bg-white shadow-md rounded-lg border border-gray-200 p-8 max-w-3xl mx-auto">
                <div className="space-y-4">
                    {/* Product Name */}
                    <div>
                        <h3 className="text-gray-700 font-medium">Name:</h3>
                        <p className="text-gray-900 text-lg">{product.name}</p>
                    </div>

                    {/* Product Detail */}
                    <div>
                        <h3 className="text-gray-700 font-medium">Detail:</h3>
                        {/* If no detail is provided, show a default message */}
                        <p className="text-gray-900 text-lg">{product.detail || "No details provided."}</p>
                    </div>

                    {/* Product Price */}
                    <div>
                        <h3 className="text-gray-700 font-medium">Price:</h3>
                        <p className="text-gray-900 text-lg">{product.price}</p>
                    </div>

                    {/* Product Status */}
                    <div>
                        <h3 className="text-gray-700 font-medium">Status:</h3>
                        <p
                            className={`text-lg font-semibold ${
                                product.status === "active" ? "text-green-600" : "text-red-600"
                            }`}
                        >
                            {/* Capitalize first letter of status */}
                            {product.status.charAt(0).toUpperCase() + product.status.slice(1)}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
