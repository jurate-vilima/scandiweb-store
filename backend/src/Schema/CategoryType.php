<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class CategoryType extends ObjectType
{
    private static ?self $instance = null;

    public function __construct()
    {
        $config = [
            'name'   => 'Category',
            'fields' => [
                'id' => [
                    'type'    => Type::int(),
                    'resolve' => function ($category) {
                        return $category->getId() ?? null;
                    },
                ],
                'name' => [
                    'type'    => Type::string(),
                    'resolve' => function ($category) {
                        return $category->getName() ?? null;
                    },
                ],
                'displayName' => [
                    'type'    => Type::string(),
                    'resolve' => function ($category) {
                        return $category->getDisplayName() ?? null;
                    },
                ],
            ],
        ];

        parent::__construct($config);
    }

    public static function instance(): self
    {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}
