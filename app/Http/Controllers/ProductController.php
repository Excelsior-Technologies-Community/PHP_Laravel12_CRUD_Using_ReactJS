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
