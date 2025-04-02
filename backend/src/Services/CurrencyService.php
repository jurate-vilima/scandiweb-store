<?php

namespace App\Services;

class CurrencyService
{
    public function getCurrentCurrency(): string
    {
        session_start();

        return $_SESSION['user_currency'] ?? 'USD';
    }

    public function setCurrentCurrency(string $currency): void
    {
        session_start();
        $_SESSION['user_currency'] = $currency;
    }
}
