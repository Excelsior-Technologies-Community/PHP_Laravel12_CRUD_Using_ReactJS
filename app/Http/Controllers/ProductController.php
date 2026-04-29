<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Inertia\Inertia; // Inertia.js for React frontend rendering
use App\Models\Product; // Product model
use App\Models\Category; // Category model for relationships
use Illuminate\Support\Facades\Validator; // Validator for request validation

class ProductController extends Controller
{
    /**
     * Display a listing of products with categories.
     */
    public function index(Request $request)
    {
        // Fetch products with their related category data
        $query = Product::with('category');

        // 🔍 Search (name + status + detail)
        if ($request->search) {
            $query->where(function ($q) use ($request) {
                $q->where('name', 'like', '%' . $request->search . '%')
                    ->orWhere('status', 'like', '%' . $request->search . '%')
                    ->orWhere('detail', 'like', '%' . $request->search . '%');
            });
        }

        // 💰 Filter by price range
        if ($request->min_price) {
            $query->where('price', '>=', $request->min_price);
        }

        if ($request->max_price) {
            $query->where('price', '<=', $request->max_price);
        }

        // 📄 Pagination with query string preservation
        $products = $query->paginate(4)->withQueryString();

        return Inertia::render('Products/Index', [
            'products' => $products,
            'filters' => $request->only(['search', 'min_price', 'max_price']),
        ]);
    }

    /**
     * Show the form for creating a new product with category list.
     */
    public function create()
    {
        // Fetch only active categories for the dropdown
        $categories = Category::where('status', 'active')->get();

        return Inertia::render('Products/Create', [
            'categories' => $categories
        ]);
    }

    /**
     * Store a newly created product.
     */
    public function store(Request $request)
    {
        // Validate incoming request data including category_id
        Validator::make($request->all(), [
            'category_id' => ['required', 'exists:categories,id'],
            'name' => ['required', 'string', 'max:255'],
            'detail' => ['nullable', 'string'],
            'price' => ['required', 'numeric'],
            'status' => ['required', 'in:active,inactive'],
        ])->validate();

        Product::create($request->all()); // Save product with category_id to database

        // Redirect with flash message
        return redirect()->route('products.index')->with('success', 'Product created successfully!');
    }

    /**
     * Display the specified product with its category.
     */
    public function show(Product $product)
    {
        // Load the category relationship before rendering
        return Inertia::render('Products/Show', [
            'product' => $product->load('category') 
        ]);
    }

    /**
     * Show the form for editing a product with category list.
     */
    public function edit(Product $product)
    {
        // Fetch active categories to populate the dropdown in the edit form
        $categories = Category::where('status', 'active')->get();

        return Inertia::render('Products/Edit', [
            'product' => $product,
            'categories' => $categories
        ]);
    }

    /**
     * Update the specified product.
     */
    public function update($id, Request $request)
    {
        // Validate incoming request data including category_id
        Validator::make($request->all(), [
            'category_id' => ['required', 'exists:categories,id'],
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
     */
    public function destroy($id)
    {
        Product::find($id)->delete(); // Delete product (soft delete if enabled)

        // Redirect with flash message
        return redirect()->route('products.index')->with('success', 'Product deleted successfully!');
    }
}