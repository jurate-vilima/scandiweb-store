FROM php:8.3-fpm AS builder

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    libpng-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
    unzip \
    git \
    curl \
 && docker-php-ext-install pdo pdo_mysql mbstring gd zip intl \
 && rm -rf /var/lib/apt/lists/*

RUN curl -sS https://getcomposer.org/installer | php -- --install-dir=/usr/local/bin --filename=composer

COPY composer.json composer.lock ./
RUN composer install --no-dev --optimize-autoloader

COPY . .

FROM php:8.3-fpm

WORKDIR /var/www

RUN apt-get update && apt-get install -y \
    nginx \
    libpng-dev \
    libzip-dev \
    libicu-dev \
    libonig-dev \
 && docker-php-ext-install pdo pdo_mysql mbstring gd zip intl \
 && rm -rf /var/lib/apt/lists/* \
 && mkdir -p /run/php

RUN rm /etc/nginx/sites-enabled/default

COPY config/nginx.conf /etc/nginx/conf.d/default.conf

COPY --from=builder /var/www /var/www

RUN chown -R www-data:www-data /var/www

EXPOSE 80

COPY config/start.sh /start.sh
RUN chmod +x /start.sh

CMD ["/start.sh"]
