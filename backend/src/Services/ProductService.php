<?php

namespace App\Services;

use App\GraphQL\Mapping\ProductFieldMapper;
use App\Models\Product\Product;
use App\Repositories\ProductRepository;

class ProductService
{
    private ProductRepository $productRepo;

    public function __construct(ProductRepository $productRepo)
    {
        $this->productRepo = $productRepo;
    }

    public function getAllProducts(array $requestedFields = ['id', 'name', 'description', 'in_stock', 'brand']): array
    {
        return $this->productRepo->findAll($requestedFields);
    }

    public function getProductsByCategory(string $category, array $graphQLFields = []): array
    {
        if (!in_array('category', $graphQLFields)) {
            array_push($graphQLFields, 'category');
        }
        $sqlColumns = ProductFieldMapper::toSqlColumns($graphQLFields);

        return $this->productRepo->findByCategory($category, $sqlColumns, $graphQLFields);
    }

    public function getProductById(string $id, array $graphQLFields = []): ?Product
    {
        $sqlColumns = ProductFieldMapper::toSqlColumns($graphQLFields);

        return $this->productRepo->findById($id, $sqlColumns, $graphQLFields);
    }
}
