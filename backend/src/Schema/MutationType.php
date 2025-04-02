<?php

namespace App\Schema;

use App\Services\OrderService;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class MutationType extends ObjectType
{
    public function __construct(OrderService $orderService)
    {
        parent::__construct([
            'name'   => 'Mutation',
            'fields' => [
                'createOrder' => [
                    'type' => Type::string(),
                    'args' => [
                        'items' => Type::nonNull(Type::listOf(Type::nonNull(OrderItemInputType::instance()))),
                    ],
                    'resolve' => fn ($root, array $args) => $orderService->createOrder($args['items']),
                ],
            ],
        ]);
    }
}
