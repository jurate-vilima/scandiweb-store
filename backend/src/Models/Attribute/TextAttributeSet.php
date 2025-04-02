<?php

namespace App\Models\Attribute;

class TextAttributeSet extends AttributeSet
{
    public function getItems(): array
    {
        if ('size' === strtolower($this->name)) {
            $order = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];
            usort($this->items, function ($a, $b) use ($order) {
                $posA = array_search(strtoupper($a['value']), $order);
                $posB = array_search(strtoupper($b['value']), $order);

                return (false === $posA ? 999 : $posA) <=> (false === $posB ? 999 : $posB);
            });
        }

        return $this->items;
    }
}
