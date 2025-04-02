<?php

namespace App\Models\Product;

class ClothesProduct extends Product
{
    public function getAvailableSizes(): array
    {
        $sizes = [];
        foreach ($this->attributes as $attr) {
            if ('size' === strtolower($attr['name'])) {
                foreach ($attr['items'] as $item) {
                    $sizes[] = $item['value'];
                }
            }
        }

        return $sizes;
    }

    public function hasSize(string $size): bool
    {
        return in_array($size, $this->getAvailableSizes(), true);
    }
}
