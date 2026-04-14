FROM composer:2 AS composer
FROM node:20 AS node
FROM php:8.4-cli

WORKDIR /app

RUN apt-get update && apt-get install -y \
    unzip git curl libzip-dev libpng-dev libonig-dev libxml2-dev supervisor \
    && docker-php-ext-install pdo pdo_mysql mbstring zip exif pcntl

COPY --from=composer /usr/bin/composer /usr/bin/composer
COPY --from=node /usr/local/ /usr/local/

COPY . .

# 1. Install dependencies.
# We pass dummy vars JUST in case, and use --no-interaction.


# 2. Build Frontend Assets
RUN npm install && npm run build

# 3. Permissions
RUN chmod -R 775 storage bootstrap/cache

# Supervisor config
COPY docker/supervisord.conf /etc/supervisor/conf.d/supervisord.conf

EXPOSE 10000 8080

# Note: It's often safer to run config:cache in the CMD or Entrypoint
# to ensure it picks up the ACTUAL runtime environment variables.
CMD php artisan config:cache && \
    php artisan migrate --force && \
    /usr/bin/supervisord -n -c /etc/supervisor/conf.d/supervisord.conf
