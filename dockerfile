# 1. Base images
FROM composer:2 AS composer
FROM node:20 AS node
FROM php:8.4-cli

WORKDIR /app

# 2. System dependencies
RUN apt-get update && apt-get install -y \
    unzip git curl libzip-dev libpng-dev libonig-dev libxml2-dev supervisor

# 3. PHP extensions
RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# 4. Copy binaries
COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY --from=node /usr/local/ /usr/local/

# 5. Copy project
COPY . .

# ✅ 6. Install PHP deps WITHOUT running Laravel (prevents crash)
RUN composer install --no-dev --optimize-autoloader --no-scripts

# ✅ 7. Build frontend (Vite)
RUN npm install && npm run build

# ✅ 8. Set permissions
RUN chmod -R 775 storage bootstrap/cache

# 9. Supervisor config
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# 10. Expose ports
EXPOSE 10000 8080

# ✅ 11. Runtime only (Laravel boots HERE, not during build)
CMD php artisan config:cache && \
    php artisan migrate --force && \
    supervisord -n
