<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeType extends ObjectType
{
    private static ?self $instance = null;

    public function __construct()
    {
        $config = [
            'name'   => 'Attribute',
            'fields' => [
                'id'    => [
                    'type'    => Type::string(),
                    'resolve' => fn ($attribute) => $attribute->getId() ?? null,
                ],
                'name'  => [
                    'type'    => Type::string(),
                    'resolve' => fn ($attribute) => $attribute->getName() ?? null,
                ],
                'type'  => [
                    'type'    => Type::string(),
                    'resolve' => fn ($attribute) => $attribute->getType() ?? null,
                ],
                'items' => [
                    'type'    => Type::listOf(AttributeItemType::instance()),
                    'resolve' => fn ($attribute) => $attribute->getItems() ?? null,
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
