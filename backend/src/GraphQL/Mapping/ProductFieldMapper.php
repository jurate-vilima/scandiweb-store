<?php

namespace App\GraphQL\Mapping;

class ProductFieldMapper
{
    private const MAP = [
        'id'          => 'p.id AS id',
        'name'        => 'p.name AS name',
        'description' => 'p.description AS description',
        'inStock'     => 'p.in_stock AS inStock',
        'brand'       => 'p.brand AS brand',
        'category'    => 'c.name AS category',
        'mainImage'   => null,
        'price'       => null,
        'currency'    => null,
        'attributes'  => null,
        'gallery'     => null,
        'images'      => null,
    ];

    public static function toSqlColumns(array $graphQLFields): array
    {
        $columns = [];
        foreach ($graphQLFields as $field) {
            if (isset(self::MAP[$field]) && null !== self::MAP[$field]) {
                $columns[] = self::MAP[$field];
            }
        }

        if (empty($columns)) {
            $columns[] = 'p.id AS id';
        }

        return $columns;
    }

    public static function needsManualLoading(string $field): bool
    {
        return !isset(self::MAP[$field]) || null === self::MAP[$field];
    }
}
