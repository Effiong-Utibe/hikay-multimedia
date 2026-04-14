FROM composer:2 AS composer
FROM node:20 AS node
FROM php:8.4-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    unzip git curl libzip-dev libpng-dev libonig-dev libxml2-dev supervisor

RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Node
COPY --from=node /usr/local/ /usr/local/

COPY . .

RUN composer install --no-dev --optimize-autoloader
RUN npm install
RUN npm run build

RUN chmod -R 775 storage bootstrap/cache

# Supervisor config
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 10000
EXPOSE 8080

# ✅ ONLY ONE ENTRYPOINT
CMD php artisan migrate --force && supervisord -n