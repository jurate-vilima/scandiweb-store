<?php

namespace App\Factories;

use App\Models\Attribute\AttributeSet;
use App\Models\BaseProduct;
use App\Models\Category\ClothesCategory;
use App\Models\Category\TechCategory;
use App\Models\Product\ClothesProduct;
use App\Models\Product\Product;
use App\Models\Product\TechProduct;

class ProductFactory
{
    private const MAP = [
        ClothesCategory::class => ClothesProduct::class,
        TechCategory::class    => TechProduct::class,
    ];

    public static function create(array $data): Product
    {
        if ($data['category'] instanceof Category) {
            $category = $data['category'];
        } elseif (is_string($data['category'])) {
            $category = CategoryFactory::create(['name' => $data['category']]);
        } else {
            $category = null;
        }
        $data['category'] = $category;

        if (isset($data['attributes']) && is_array($data['attributes'])) {
            $attributeObjects = [];
            foreach ($data['attributes'] as $attr) {
                if ($attr instanceof AttributeSet) {
                    $attributeObjects[] = $attr;
                } elseif (is_array($attr)) {
                    $attributeObjects[] = AttributeSetFactory::create($attr);
                }
            }
            $data['attributes'] = $attributeObjects;
        }

        $categoryClass = $category ? get_class($category) : null;
        $productClass  = self::MAP[$categoryClass] ?? BaseProduct::class;

        return new $productClass($data);
    }
}
