FROM composer:2 AS composer
FROM node:20 AS node
FROM php:8.4-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    unzip git curl libzip-dev libpng-dev libonig-dev libxml2-dev supervisor

RUN docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY --from=node /usr/local/ /usr/local/

COPY . .

# ✅ 1. Install PHP deps WITHOUT running Laravel
RUN composer install --no-dev --optimize-autoloader --no-scripts

# ✅ 2. Fake env so Laravel won't crash during build
ENV REVERB_APP_KEY=fake
ENV REVERB_APP_SECRET=fake
ENV REVERB_APP_ID=fake
ENV BROADCAST_CONNECTION=log

# ✅ 3. Now allow scripts (safe)
RUN composer dump-autoload

# ✅ 4. Build frontend AFTER Laravel is stable
RUN npm install && npm run build

# ✅ 5. Permissions
RUN chmod -R 775 storage bootstrap/cache

# Supervisor config
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 10000
EXPOSE 8080

# ✅ 6. Runtime (real env will be used here)
CMD php artisan config:clear && \
    php artisan config:cache && \
    php artisan migrate --force && \
    supervisord -n
