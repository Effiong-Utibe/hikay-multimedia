FROM composer:2 AS composer

FROM node:20 AS node

FROM php:8.4-cli

WORKDIR /app

# Install dependencies
RUN apt-get update && apt-get install -y \
    unzip git curl libzip-dev libpng-dev libonig-dev libxml2-dev

RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

# Composer
COPY --from=composer /usr/bin/composer /usr/bin/composer

# Node (for Vite build)
COPY --from=node /usr/local/bin/node /usr/local/bin/node
COPY --from=node /usr/local/lib/node_modules /usr/local/lib/node_modules
RUN ln -s /usr/local/lib/node_modules/npm/bin/npm-cli.js /usr/local/bin/npm

WORKDIR /app

COPY . .

# Install backend deps
RUN composer install --no-dev --optimize-autoloader

# Install frontend deps + build assets
RUN npm install
RUN npm run build

# Permissions
RUN chmod -R 775 storage bootstrap/cache

EXPOSE 10000

CMD php artisan migrate --force && php -S 0.0.0.0:10000 -t public
