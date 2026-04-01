#!/bin/bash
cd /home/mychoicemyworld/htdocs/mychoicemyworld.in

echo "=== Deploying ==="
git stash
git pull origin main
npm install --legacy-peer-deps 2>/dev/null
npm run build
php artisan migrate --force --no-interaction
php artisan optimize:clear
php artisan optimize
echo "=== Done ==="
