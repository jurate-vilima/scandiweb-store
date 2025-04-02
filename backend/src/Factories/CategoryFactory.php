<?php

namespace App\Factories;

use App\Models\Category\AllCategory;
use App\Models\Category\Category;
use App\Models\Category\ClothesCategory;
use App\Models\Category\TechCategory;

class CategoryFactory
{
    public static function create(array $data): Category
    {
        $nameKey = strtolower($data['name'] ?? '');

        return match ($nameKey) {
            'all'     => new AllCategory($data),
            'clothes' => new ClothesCategory($data),
            'tech'    => new TechCategory($data),
        };
    }
}
