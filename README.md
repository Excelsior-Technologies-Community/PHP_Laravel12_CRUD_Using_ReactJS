🚀 Laravel12-react-crud — Full Project Documentation

This documentation provides a clean, complete, and professional guide for the Laravel 12 + React + Inertia.js CRUD project. It explains folder structure, installation commands, database setup, controllers, models, React pages, and how to run the application.

The project demonstrates a modern full-stack setup combining Laravel 12 for the backend, React for the frontend, and Inertia.js to seamlessly bridge the two. It follows RESTful principles, supports soft deletes, and leverages Tailwind CSS for styling.

---

## 📌 1. Project Overview

This project is a Laravel 12 + React + Inertia.js CRUD application designed to manage products. Users can perform the following operations:

* **Add Product** — Create new products using a user-friendly form.
* **Edit Product** — Update existing product details.
* **View Single Product** — View a detailed page for an individual product.
* **View All Products** — Display all products in a table with search, status indicators, and action buttons.
* **Delete Product (Soft Delete)** — Remove products without permanently deleting them from the database.

### Key Technologies Used

* **Backend:** Laravel 12, Eloquent ORM, Soft Deletes, REST-style controllers
* **Frontend:** React, JSX, Tailwind CSS
* **Integration:** Inertia.js for SPA-like navigation
* **Optional:** Axios for HTTP requests

The UI is built using React, backend using Laravel REST-style controllers, and data flows through Inertia.js.

---

## 📂 2. Folder Structure (Exact Project Structure)

```
laravel12-react-crud/
│── app/
│   ├── Http/
│   │    ├── Controllers/
│   │    │     └── ProductController.php
│   ├── Models/
│        └── Product.php
│
│── database/
│   ├── migrations/
│         └── xxxx_xx_xx_create_products_table.php
│
│── resources/
│   ├── js/
│   │    ├── Pages/
│   │    │     └── Products/
│   │    │           ├── Index.jsx
│   │    │           ├── Create.jsx
│   │    │           ├── Edit.jsx
│   │    │           ├── Show.jsx
│   │    ├── app.jsx
│
│── routes/
│   ├── web.php
│
│── .env
│── package.json
│── vite.config.js
```

---

## 🎯 3. Installation Commands

```bash
# 1. Create project
composer create-project laravel/laravel laravel12-react-crud "12.*"
cd laravel12-react-crud

# 2. Install Breeze (React UI Scaffolding) — OPTIONAL
composer require laravel/breeze --dev
php artisan breeze:install react

# 3. Install node packages
npm install

# 4. Install Inertia packages
npm install @inertiajs/inertia @inertiajs/react

# (Optional) Install axios
npm install axios

# 5. Run Vite
npm run dev

# 6. Configure .env and migrate
php artisan migrate

# 7. Run Laravel
php artisan serve
```

### ✅ Notes

* Breeze is optional; we only use its React + Tailwind setup
* Keep **two terminals running**:

  * `php artisan serve`
  * `npm run dev`

---

## 🎯 4. .env Database Setup

```
DB_CONNECTION=mysql
DB_HOST=127.0.0.1
DB_PORT=3306
DB_DATABASE=laravel12_react_crud
DB_USERNAME=root
DB_PASSWORD=
```

# Configure .env and migrate 

```
php artisan migrate
---

```
## 🎯 5. Migration Table

### 📄 database/migrations/xxxx_create_products_table.php

### ✅ Command

```bash
php artisan make:migration create_products_table
```

```php
<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     * This method is executed when we run:
     * php artisan migrate
     */
    public function up(): void
    {
        // Create the "products" table
        Schema::create('products', function (Blueprint $table) {

            // Primary key (auto-increment ID)
            $table->id();

            // Product name column
            $table->string('name');

            // Product detail/description (nullable)
            $table->text('detail')->nullable();

            // Product price (10 digits total, 2 digits after decimal)
            // Default price is set to 0
            $table->decimal('price', 10, 2)->default(0);

            // Product status (active or inactive)
            // Default status is active
            $table->enum('status', ['active', 'inactive'])->default('active');

            // User ID who created the product (nullable for now)
            $table->unsignedBigInteger('created_by')->nullable();

            // User ID who last updated the product (nullable for now)
            $table->unsignedBigInteger('updated_by')->nullable();

            // created_at and updated_at timestamps
            $table->timestamps();

            // Soft delete column (deleted_at)
            // Allows record to be "deleted" without removing from DB
            $table->softDeletes();
        });
    }

    /**
     * Reverse the migrations.
     * This method is executed when we run:
     * php artisan migrate:rollback
     */
    public function down(): void
    {
        // Drop the products table if it exists
        Schema::dropIfExists('products');
    }
};

```

---

## 🎯 6. Model

### 📄 app/Models/Product.php

### ✅ Command

```bash
php artisan make:model Product
```

```php
<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Product extends Model
{
    // ✅ Include factory methods for seeding and testing
    use HasFactory;

    // ✅ Enable soft deletes, so records are not permanently deleted
    use SoftDeletes;

    /**
     * The attributes that are mass assignable.
     * 
     * These are the fields that can be filled using methods like `create()` or `update()`.
     */
    protected $fillable = [
        'name',       // Name of the product
        'detail',     // Detailed description (nullable)
        'price',      // Product price (decimal)
        'status',     // Status of the product: 'active' or 'inactive'
        'created_by', // ID of the user who created this product (nullable)
        'updated_by', // ID of the user who last updated this product (nullable)
    ];
}

```

---

## 🎯 7. Controller (CRUD)

### ✅ Command

```bash
php artisan make:controller ProductController
```
### 📄 app/Http/Controllers/ProductController.php
```
<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Inertia.js for React frontend rendering
use App\Models\Product; // Product model
use Illuminate\Support\Facades\Validator; // Validator for request validation

class ProductController extends Controller
{
    /**
     * Display a listing of products.
     * 
     * This method fetches all products from the database
     * and sends them to the Inertia 'Products/Index' page.
     */
    public function index()
    {
        $products = Product::all(); // Get all products
        return Inertia::render('Products/Index', ['products' => $products]); // Pass data to React page
    }

    /**
     * Show the form for creating a new product.
     * 
     * This method renders the React 'Products/Create' page
     * which contains the form to add a new product.
     */
    public function create()
    {
        return Inertia::render('Products/Create'); // Show create product form
    }

    /**
     * Store a newly created product.
     * 
     * This method validates the request data and saves a new product to the database.
     * After creation, it redirects to the products list with a success message.
     */
    public function store(Request $request)
    {
        // Validate incoming request data
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'detail' => ['nullable', 'string'],
            'price' => ['required', 'numeric'],
            'status' => ['required', 'in:active,inactive'],
        ])->validate();

        Product::create($request->all()); // Save product to database

        // Redirect with flash message
        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    /**
     * Display the specified product.
     * 
     * This method shows the details of a single product
     * on the React 'Products/Show' page.
     */
    public function show(Product $product)
    {
        return Inertia::render('Products/Show', [
            'product' => $product // Pass the product to React page
        ]);
    }

    /**
     * Show the form for editing a product.
     * 
     * This method renders the React 'Products/Edit' page
     * with the selected product data pre-filled in the form.
     */
    public function edit(Product $product)
    {
        return Inertia::render('Products/Edit', [
            'product' => $product // Pass product to React edit page
        ]);
    }

    /**
     * Update the specified product.
     * 
     * This method validates the request data and updates
     * the existing product in the database.
     * After update, it redirects to the products list with a success message.
     */
    public function update($id, Request $request)
    {
        // Validate incoming request data
        Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'detail' => ['nullable', 'string'],
            'price' => ['required', 'numeric'],
            'status' => ['required', 'in:active,inactive'],
        ])->validate();

        Product::find($id)->update($request->all()); // Update product in database

        // Redirect with flash message
        return redirect()->route('products.index')->with('success', 'Product updated successfully!');
    }

    /**
     * Remove the specified product.
     * 
     * This method deletes the selected product from the database.
     * After deletion, it redirects to the products list with a success message.
     */
    public function destroy($id)
    {
        Product::find($id)->delete(); // Delete product (soft delete if enabled)

        // Redirect with flash message
        return redirect()->route('products.index')->with('success', 'Product deleted successfully!');
    }
}


---
```
## 🎯 8. Routes

### 📄 routes/web.php
```
<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\ProductController;

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
});

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});


// Products CRUD routes
Route::get('/products', [ProductController::class, 'index'])->name('products.index');       // List all products
Route::get('/products/create', [ProductController::class, 'create'])->name('products.create'); // Show create form
Route::post('/products', [ProductController::class, 'store'])->name('products.store');       // Store new product
Route::get('/products/{product}', [ProductController::class, 'show'])->name('products.show');
Route::get('/products/{product}/edit', [ProductController::class, 'edit'])->name('products.edit'); // Show edit form
Route::put('/products/{id}', [ProductController::class, 'update'])->name('products.update'); // Update product
Route::delete('/products/{id}', [ProductController::class, 'destroy'])->name('products.destroy'); // Delete product

require __DIR__.'/auth.php';


---

```
## 🎯 9. Flash Messages (Inertia Middleware)

### 📄 app/Http/Middleware/HandleInertiaRequests.php
```php

'flash' => [
    'success' => fn () => $request->session()->get('success'),
    'error'   => fn () => $request->session()->get('error'),
],
```

---
## 🎯 10. React Pages

### 📁 resources/js/Pages/Products/

* Index.jsx
* Create.jsx
* Edit.jsx
* Show.jsx

1️⃣ Index.jsx — List Products

Path: resources/js/Pages/Products/Index.jsx

Purpose: Display all products in a table with actions (Show, Edit, Delete) and flash messages.
```

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

```
2️⃣ Create.jsx — Add New Product

Path: resources/js/Pages/Products/Create.jsx

Purpose: Render a form to create a new product.
```

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

```
3️⃣ Edit.jsx — Edit Existing Product

Path: resources/js/Pages/Products/Edit.jsx

Purpose: Render a form pre-filled with an existing product’s data so the user can update it.
```

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

```
4️⃣ Show.jsx — Display Single Product

Path: resources/js/Pages/Products/Show.jsx

Purpose: Display the details of a single product in read-only mode.
```

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

---
```
## 🚀 11. How to Run the Application

### 1️⃣ Start Laravel Backend

```bash
php artisan serve
```

Visit: 

```
[http://localhost:8000](http://localhost:8000)
```

### 2️⃣ Start Frontend (Vite)

```bash
npm run dev
```

### 3️⃣ Optional Production Build

```bash
npm run build
```

### 4️⃣ Open App
```
* Home: [http://localhost:8000](http://localhost:8000)
* Products: [http://localhost:8000/products](http://localhost:8000/products)
```
---

✅ **Keep both servers running** for smooth development.

🎉 Your Laravel 12 + React + Inertia CRUD application is now fully ready and documented.
