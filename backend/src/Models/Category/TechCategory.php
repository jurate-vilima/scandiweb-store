<?php

namespace App\Models\Category;

class TechCategory extends Category
{
    public function getDisplayName(): string
    {
        return 'Technology';
    }

    public function isFilterable(): bool
    {
        return true;
    }
}
