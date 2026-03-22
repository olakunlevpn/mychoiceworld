#!/bin/bash
# Fix permissions for shared hosting
# Run from the Laravel app directory

echo "Fixing storage and cache permissions..."

chmod -R 775 storage
chmod -R 775 bootstrap/cache

# Ensure storage subdirectories exist
mkdir -p storage/app/public
mkdir -p storage/framework/cache/data
mkdir -p storage/framework/sessions
mkdir -p storage/framework/views
mkdir -p storage/logs

echo "Permissions fixed."
