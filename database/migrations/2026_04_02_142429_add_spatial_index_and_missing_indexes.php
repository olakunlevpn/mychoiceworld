<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Spatial index on vendor location for ST_Distance_Sphere queries
        Schema::table('vendors', function (Blueprint $table) {
            $table->spatialIndex('location');
        });

        // Product images: composite index for primary image lookups
        Schema::table('product_images', function (Blueprint $table) {
            $table->index(['product_id', 'is_primary']);
            $table->index(['product_id', 'sort_order']);
        });

        // Reviews: composite index for homepage reviews query
        Schema::table('reviews', function (Blueprint $table) {
            $table->index(['is_published', 'rating']);
        });
    }

    public function down(): void
    {
        Schema::table('vendors', function (Blueprint $table) {
            $table->dropSpatialIndex(['location']);
        });

        Schema::table('product_images', function (Blueprint $table) {
            $table->dropIndex(['product_id', 'is_primary']);
            $table->dropIndex(['product_id', 'sort_order']);
        });

        Schema::table('reviews', function (Blueprint $table) {
            $table->dropIndex(['is_published', 'rating']);
        });
    }
};
