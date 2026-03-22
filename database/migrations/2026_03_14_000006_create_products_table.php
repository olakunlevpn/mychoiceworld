<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->foreignId('vendor_id')->constrained('vendors')->cascadeOnDelete();
            $table->foreignId('category_id')->constrained('categories')->cascadeOnDelete();
            $table->string('name', 255);
            $table->string('slug', 255)->unique();
            $table->text('description')->nullable();
            $table->decimal('price', 10, 2);
            $table->decimal('compare_price', 10, 2)->nullable();
            $table->string('currency', 3)->default('USD');
            $table->string('gender')->nullable();
            $table->string('primary_color', 50)->nullable();
            $table->string('primary_color_hex', 7)->nullable();
            $table->string('status')->default('draft');
            $table->boolean('is_featured')->default(false);
            $table->boolean('is_reservable')->default(true);
            $table->integer('views_count')->default(0);
            $table->integer('reservations_count')->default(0);
            $table->timestamps();
            $table->softDeletes();

            $table->index(['status', 'category_id', 'gender']);
            $table->index(['vendor_id', 'status']);
            $table->index(['price', 'primary_color']);
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
