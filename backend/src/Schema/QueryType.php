<?php

namespace App\Schema;

use App\Services\CategoryService;
use App\Services\ProductService;
use GraphQL\Type\Definition\ObjectType;
use GraphQL\Type\Definition\ResolveInfo;
use GraphQL\Type\Definition\Type;

class QueryType extends ObjectType
{
    public function __construct(
        private CategoryService $categoryService,
        private ProductService $productService
    ) {
        $config = [
            'name'   => 'Query',
            'fields' => [
                'productsByCategory' => [
                    'type' => Type::listOf(ProductType::instance()),
                    'args' => [
                        'category' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function ($root, array $args, $context, ResolveInfo $info) {
                        $requestedFields = array_keys($info->getFieldSelection());

                        return $this->productService->getProductsByCategory($args['category'], $requestedFields);
                    },
                ],
                'categories' => [
                    'type'    => Type::listOf(CategoryType::instance()),
                    'resolve' => fn () => $this->categoryService->getAllCategories(),
                ],
                'products' => [
                    'type'    => Type::listOf(ProductType::instance()),
                    'resolve' => fn () => $this->productService->getAllProducts(),
                ],
                'productById' => [
                    'type' => ProductType::instance(),
                    'args' => [
                        'id' => Type::nonNull(Type::string()),
                    ],
                    'resolve' => function ($root, array $args, $context, ResolveInfo $info) {
                        $requestedFields = array_keys($info->getFieldSelection());

                        return $this->productService->getProductById($args['id'], $requestedFields);
                    },
                ],
            ],
        ];
        parent::__construct($config);
    }
}
