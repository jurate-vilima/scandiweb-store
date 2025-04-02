<?php

namespace App\Models\Category;

class ClothesCategory extends Category
{
    public function getDisplayName(): string
    {
        return 'Clothes';
    }

    public function isFilterable(): bool
    {
        return true;
    }
}
