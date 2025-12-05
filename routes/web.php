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
