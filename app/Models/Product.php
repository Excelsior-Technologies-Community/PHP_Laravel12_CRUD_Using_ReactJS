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
