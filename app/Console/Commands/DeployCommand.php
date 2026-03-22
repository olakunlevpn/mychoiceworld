<?php

namespace App\Console\Commands;

use App\Models\AiMatchResult;
use App\Models\AiMatchSession;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use App\Models\Vendor;
use App\Models\VendorAnalytic;
use App\Models\Wishlist;
use Illuminate\Console\Command;

class DeployCommand extends Command
{
    protected $signature = 'app:deploy {action : migrate|seed|cleanup|fresh}';

    protected $description = 'Deployment helper — migrate, seed test data, or clean up seeded data';

    public function handle(): int
    {
        return match ($this->argument('action')) {
            'migrate' => $this->runMigrate(),
            'seed' => $this->runSeed(),
            'cleanup' => $this->runCleanup(),
            'fresh' => $this->runFresh(),
            default => $this->invalidAction(),
        };
    }

    /**
     * Run migrations + cache optimizations.
     *
     * php artisan app:deploy migrate
     */
    private function runMigrate(): int
    {
        $this->info('Running migrations...');
        $this->call('migrate', ['--force' => true]);

        $this->info('Caching config, routes, views...');
        $this->call('optimize');
        $this->call('view:cache');
        $this->call('filament:optimize');
        $this->call('icons:cache');

        $this->info('Creating storage symlink...');
        $this->call('storage:link');

        $this->newLine();
        $this->info('Migration & optimization complete!');

        return self::SUCCESS;
    }

    /**
     * Seed test/demo data for testing.
     *
     * php artisan app:deploy seed
     */
    private function runSeed(): int
    {
        $this->info('Seeding database with test data...');
        $this->call('db:seed', ['--force' => true]);

        $this->newLine();
        $this->info('Seeding complete! Test data is now in the database.');
        $this->warn('Run "php artisan app:deploy cleanup" when you are done testing to remove seeded data.');

        return self::SUCCESS;
    }

    /**
     * Remove all seeded products, vendors, customers and related data.
     * Keeps: admin user, categories, event types, style preferences, color palettes, pages, hero slides, help articles, FAQs.
     *
     * php artisan app:deploy cleanup
     */
    private function runCleanup(): int
    {
        $this->warn('This will DELETE all seeded products, vendors, customers, reservations, reviews, wishlists and analytics.');
        $this->warn('It will KEEP: admin user, categories, event types, style preferences, color palettes, CMS pages, hero slides.');

        if (! $this->confirm('Are you sure you want to proceed?')) {
            $this->info('Cancelled.');

            return self::SUCCESS;
        }

        $this->info('Cleaning up seeded data...');

        // Order matters — delete children first
        $wishlistCount = Wishlist::count();
        Wishlist::query()->delete();
        $this->line("  Deleted {$wishlistCount} wishlists");

        $reviewCount = Review::count();
        Review::query()->delete();
        $this->line("  Deleted {$reviewCount} reviews");

        $reservationCount = Reservation::count();
        Reservation::query()->delete();
        $this->line("  Deleted {$reservationCount} reservations");

        $aiResultCount = AiMatchResult::count();
        AiMatchResult::query()->delete();
        $this->line("  Deleted {$aiResultCount} AI match results");

        $aiSessionCount = AiMatchSession::count();
        AiMatchSession::query()->delete();
        $this->line("  Deleted {$aiSessionCount} AI match sessions");

        $analyticsCount = VendorAnalytic::count();
        VendorAnalytic::query()->delete();
        $this->line("  Deleted {$analyticsCount} vendor analytics");

        $imageCount = ProductImage::count();
        ProductImage::query()->delete();
        $this->line("  Deleted {$imageCount} product images");

        $variantCount = ProductVariant::count();
        ProductVariant::query()->delete();
        $this->line("  Deleted {$variantCount} product variants");

        // Detach pivot tables before deleting products
        Product::all()->each(function (Product $product): void {
            $product->eventTypes()->detach();
            $product->stylePreferences()->detach();
        });

        $productCount = Product::count();
        Product::query()->delete();
        $this->line("  Deleted {$productCount} products");

        $vendorCount = Vendor::count();
        Vendor::query()->delete();
        $this->line("  Deleted {$vendorCount} vendors");

        // Delete non-admin users (customers + vendor users)
        $userCount = User::where('role', '!=', 'admin')->count();
        User::where('role', '!=', 'admin')->delete();
        $this->line("  Deleted {$userCount} non-admin users");

        $this->newLine();
        $this->info('Cleanup complete! Only admin user and reference data remain.');

        return self::SUCCESS;
    }

    /**
     * Full reset: migrate fresh + seed everything.
     *
     * php artisan app:deploy fresh
     */
    private function runFresh(): int
    {
        $this->warn('This will DROP all tables and re-migrate + seed from scratch.');

        if (! $this->confirm('Are you sure? All data will be lost!')) {
            $this->info('Cancelled.');

            return self::SUCCESS;
        }

        $this->call('migrate:fresh', ['--force' => true, '--seed' => true]);

        $this->newLine();
        $this->info('Fresh migration + seed complete!');

        return self::SUCCESS;
    }

    private function invalidAction(): int
    {
        $this->error('Invalid action. Use: migrate, seed, cleanup, or fresh');
        $this->line('');
        $this->line('  php artisan app:deploy migrate   — Run migrations + cache optimizations');
        $this->line('  php artisan app:deploy seed      — Seed test/demo data');
        $this->line('  php artisan app:deploy cleanup   — Remove all seeded products, vendors & users');
        $this->line('  php artisan app:deploy fresh     — Drop all tables, re-migrate & seed');

        return self::FAILURE;
    }
}
