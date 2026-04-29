<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Inertia;

class CategoryController extends Controller
{
    public function index() {
        $categories = Category::all();
        return Inertia::render('Categories/Index', ['categories' => $categories]);
    }

    public function create() {
        return Inertia::render('Categories/Create');
    }

    public function store(Request $request) {
        $request->validate(['name' => 'required|string|max:255', 'status' => 'required']);
        Category::create($request->all());
        return redirect()->route('categories.index')->with('success', 'Category Created!');
    }

    public function edit(Category $category) {
        return Inertia::render('Categories/Edit', ['category' => $category]);
    }

    public function update(Request $request, $id) {
        $category = Category::findOrFail($id);
        $category->update($request->all());
        return redirect()->route('categories.index')->with('success', 'Category Updated!');
    }

    public function destroy($id) {
        Category::findOrFail($id)->delete();
        return redirect()->back()->with('success', 'Category Deleted!');
    }
}