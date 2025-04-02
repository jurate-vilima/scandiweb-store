<?php

namespace App\Schema;

use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\Type;

class ProductType extends ObjectType
{
    private static ?self $instance = null;

    public function __construct()
    {
        $config = [
            'name'   => 'Product',
            'fields' => [
                'id' => [
                    'type'    => Type::string(),
                    'resolve' => fn ($product) => $product->getId() ?? null,
                ],
                'name' => [
                    'type'    => Type::string(),
                    'resolve' => fn ($product) => $product->getName() ?? null,
                ],
                'description' => [
                    'type'    => Type::string(),
                    'resolve' => fn ($product) => $product->getDescription() ?? null,
                ],
                'inStock' => [
                    'type'    => Type::boolean(),
                    'resolve' => fn ($product) => $product->isInStock() ?? null,
                ],
                'brand' => [
                    'type'    => Type::string(),
                    'resolve' => fn ($product) => $product->getBrand() ?? null,
                ],
                'mainImage' => [
                    'type'    => Type::string(),
                    'resolve' => fn ($product) => $product->getMainImage() ?? null,
                ],
                'price' => [
                    'type'    => Type::float(),
                    'resolve' => fn ($product) => $product->getPrice() ?? null,
                ],
                'currency' => [
                    'type'    => Type::string(),
                    'resolve' => fn ($product) => $product->getCurrency() ?? null,
                ],
                'gallery' => [
                    'type'    => Type::listOf(Type::string()),
                    'resolve' => fn ($product) => $product->getGallery() ?? [],
                ],
                'attributes' => [
                    'type'    => Type::listOf(AttributeType::instance()),
                    'resolve' => fn ($product) => $product->getAttributes() ?? [],
                ],
                'category' => [
                    'type'    => CategoryType::instance(),
                    'resolve' => fn ($product) => $product->getCategory() ?? [],
                ],
            ],
        ];
        parent::__construct($config);
    }

    public static function instance(): self
    {
        if (null === self::$instance) {
            self::$instance = new self();
        }

        return self::$instance;
    }
}
