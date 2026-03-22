<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        // Step 1: Multiply existing decimal values by 100 to convert to cents
        DB::statement('UPDATE products SET price = ROUND(price * 100) WHERE price IS NOT NULL');
        DB::statement('UPDATE products SET compare_price = ROUND(compare_price * 100) WHERE compare_price IS NOT NULL');
        DB::statement('UPDATE product_variants SET price_override = ROUND(price_override * 100) WHERE price_override IS NOT NULL');
        DB::statement('UPDATE ai_match_sessions SET budget_min = ROUND(budget_min * 100) WHERE budget_min IS NOT NULL');
        DB::statement('UPDATE ai_match_sessions SET budget_max = ROUND(budget_max * 100) WHERE budget_max IS NOT NULL');

        // Step 2: Alter column types from decimal to unsigned big integer
        Schema::table('products', function (Blueprint $table) {
            $table->unsignedBigInteger('price')->change();
            $table->unsignedBigInteger('compare_price')->nullable()->change();
        });

        Schema::table('product_variants', function (Blueprint $table) {
            $table->unsignedBigInteger('price_override')->nullable()->change();
        });

        Schema::table('ai_match_sessions', function (Blueprint $table) {
            $table->unsignedBigInteger('budget_min')->nullable()->change();
            $table->unsignedBigInteger('budget_max')->nullable()->change();
        });
    }

    public function down(): void
    {
        // Step 1: Alter back to decimal
        Schema::table('products', function (Blueprint $table) {
            $table->decimal('price', 10, 2)->change();
            $table->decimal('compare_price', 10, 2)->nullable()->change();
        });

        Schema::table('product_variants', function (Blueprint $table) {
            $table->decimal('price_override', 10, 2)->nullable()->change();
        });

        Schema::table('ai_match_sessions', function (Blueprint $table) {
            $table->decimal('budget_min', 10, 2)->nullable()->change();
            $table->decimal('budget_max', 10, 2)->nullable()->change();
        });

        // Step 2: Divide by 100 to restore decimal values
        DB::statement('UPDATE products SET price = price / 100 WHERE price IS NOT NULL');
        DB::statement('UPDATE products SET compare_price = compare_price / 100 WHERE compare_price IS NOT NULL');
        DB::statement('UPDATE product_variants SET price_override = price_override / 100 WHERE price_override IS NOT NULL');
        DB::statement('UPDATE ai_match_sessions SET budget_min = budget_min / 100 WHERE budget_min IS NOT NULL');
        DB::statement('UPDATE ai_match_sessions SET budget_max = budget_max / 100 WHERE budget_max IS NOT NULL');
    }
};
