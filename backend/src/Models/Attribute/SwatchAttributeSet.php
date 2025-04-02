<?php

namespace App\Models\Attribute;

class SwatchAttributeSet extends AttributeSet
{
    public function getItems(): array
    {
        $filtered = [];
        foreach ($this->items as $item) {
            $value = trim($item['value']);
            if ($this->isValidColor($value)) {
                $item['value'] = strtoupper($value);
                $filtered[]    = $item;
            }
        }

        return $filtered;
    }

    private function isValidColor(string $color): bool
    {
        return (bool) preg_match('/^#(?:[0-9A-Fa-f]{3}){1,2}$/', $color);
    }
}
