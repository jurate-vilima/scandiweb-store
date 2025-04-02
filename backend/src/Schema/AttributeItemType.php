<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class AttributeItemType extends ObjectType
{
    private static ?self $instance = null;

    public function __construct()
    {
        $config = [
            'name'   => 'AttributeItem',
            'fields' => [
                'value'        => Type::string(),
                'displayValue' => Type::string(),
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
