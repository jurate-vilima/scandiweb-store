<?php

namespace App\Models\Category;

class AllCategory extends Category
{
    public function getDisplayName(): string
    {
        return 'All Products';
    }

    public function isFilterable(): bool
    {
        return false;
    }
}
