#!/bin/bash
cd /home/mychoicemyworld/htdocs/mychoicemyworld.in

git fetch origin main --quiet
LOCAL=$(git rev-parse HEAD)
REMOTE=$(git rev-parse origin/main)

if [ "$LOCAL" != "$REMOTE" ]; then
    echo "$(date): New changes detected, deploying..."
    git stash
    git pull origin main
    npm install --legacy-peer-deps 2>/dev/null
    npm run build
    php artisan migrate --force --no-interaction
    php artisan optimize:clear
    php artisan optimize
    echo "$(date): Deploy complete"
fi
