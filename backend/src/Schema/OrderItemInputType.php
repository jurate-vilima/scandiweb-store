<?php

namespace App\Schema;

use GraphQL\Type\Definition\InputObjectType;
use GraphQL\Type\Definition\Type;

class OrderItemInputType extends InputObjectType
{
    private static ?self $instance = null;

    public function __construct()
    {
        parent::__construct([
            'name'   => 'OrderItemInput',
            'fields' => [
                'productId'  => Type::nonNull(Type::string()),
                'quantity'   => Type::nonNull(Type::int()),
                'price'      => Type::nonNull(Type::float()),
                'currencyId' => Type::nonNull(Type::int()),
            ],
        ]);
    }

    public static function instance(): self
    {
        if (!self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}
