<?php

namespace App\Factories;

use App\Models\Attribute\AttributeSet;
use App\Models\Attribute\SwatchAttributeSet;
use App\Models\Attribute\TextAttributeSet;

class AttributeSetFactory
{
    private const MAP = [
        'text'   => TextAttributeSet::class,
        'swatch' => SwatchAttributeSet::class,
    ];

    public static function create(array $data): AttributeSet
    {
        $type = $data['type'] ?? 'text';

        $class = self::MAP[$type] ?? TextAttributeSet::class;

        return new $class($data);
    }
}
