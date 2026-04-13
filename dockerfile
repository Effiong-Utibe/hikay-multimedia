FROM composer:2 AS composer

FROM node:20 AS node

FROM php:8.4-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    unzip git curl libzip-dev libpng-dev libonig-dev libxml2-dev

RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Node
COPY --from=node /usr/local/ /usr/local/

WORKDIR /app

COPY . .

# Install backend dependencies
RUN composer install --no-dev --optimize-autoloader

# Install frontend dependencies + build assets
RUN npm install
RUN npm run build

# Permissions (IMPORTANT)
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 10000

# Run server ONLY
CMD php artisan migrate --force && php -S 0.0.0.0:10000 -t public
