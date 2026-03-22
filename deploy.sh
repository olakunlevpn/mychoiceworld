#!/bin/bash
# Production deployment script for shared hosting
# Run from the Laravel app directory (NOT public_html)

set -e

echo "=== MyChoice MyWorld — Shared Hosting Deploy ==="

# 1. Install PHP dependencies (no dev)
echo "[1/7] Installing Composer dependencies..."
composer install --no-dev --optimize-autoloader --no-interaction

# 2. Build frontend assets (skip if node_modules not available — pre-build locally)
if [ -d "node_modules" ]; then
    echo "[2/7] Building frontend assets..."
    npm run build
else
    echo "[2/7] Skipping npm build (run locally and upload public/build/)"
fi

# 3. Generate app key if not set
if ! grep -q "APP_KEY=base64:" .env; then
    echo "[3/7] Generating application key..."
    php artisan key:generate --force
else
    echo "[3/7] App key already set"
fi

# 4. Storage link (symlink storage/app/public → public/storage)
echo "[4/7] Creating storage symlink..."
php artisan storage:link 2>/dev/null || echo "  Storage link already exists"

# 5. Run migrations
echo "[5/7] Running database migrations..."
php artisan migrate --force --no-interaction

# 6. Cache everything for performance
echo "[6/7] Caching config, routes, views, icons..."
php artisan optimize
php artisan view:cache
php artisan filament:optimize
php artisan icons:cache

# 7. Clear old app cache
echo "[7/7] Clearing application cache..."
php artisan cache:clear

echo ""
echo "=== Deploy complete! ==="
echo ""
echo "Checklist:"
echo "  ✓ .env is configured (APP_ENV=production, APP_DEBUG=false)"
echo "  ✓ public_html/index.php points to this directory"
echo "  ✓ storage/ and bootstrap/cache/ are writable (chmod 775)"
echo "  ✓ Storage symlink: public_html/storage → app/storage/app/public"
