<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->string('phone', 20)->nullable()->after('email');
            $table->string('role')->default('customer')->after('phone');
            $table->string('avatar', 500)->nullable()->after('role');
            $table->boolean('is_active')->default(true)->after('avatar');
            $table->decimal('last_latitude', 10, 8)->nullable()->after('is_active');
            $table->decimal('last_longitude', 11, 8)->nullable()->after('last_latitude');
            $table->timestamp('last_location_at')->nullable()->after('last_longitude');
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::table('users', function (Blueprint $table) {
            $table->dropSoftDeletes();
            $table->dropColumn([
                'phone',
                'role',
                'avatar',
                'is_active',
                'last_latitude',
                'last_longitude',
                'last_location_at',
            ]);
        });
    }
};
