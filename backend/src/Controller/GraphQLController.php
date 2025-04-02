<?php

namespace App\Controller;

use App\Http\Request;
use App\Schema\MutationType;
use App\Schema\QueryType;
use App\Services\CategoryService;
use App\Services\ProductService;
use GraphQL\Error\DebugFlag;
use GraphQL\GraphQL as GraphQLBase;
use GraphQL\Type\Schema;
use GraphQL\Type\SchemaConfig;

class GraphQLController
{
    private ProductService $productService;
    private CategoryService $categoryService;
    private QueryType $queryType;
    private MutationType $mutationType;
    private Request $request;

    public function __construct(
        ProductService $productService,
        CategoryService $categoryService,
        QueryType $queryType,
        MutationType $mutationType,
        Request $request
    ) {
        $this->productService  = $productService;
        $this->categoryService = $categoryService;
        $this->queryType       = $queryType;
        $this->mutationType    = $mutationType;
        $this->request         = $request;
    }

    public function handle(): void
    {
        try {
            $schema = new Schema(
                (new SchemaConfig())
                    ->setQuery($this->queryType)
                    ->setMutation($this->mutationType)
            );

            $query = $this->request->input('query');
            if (!$query) {
                throw new \RuntimeException('GraphQL query not provided');
            }

            $variables = $this->request->input('variables');

            $debugFlags = 'development' === $_ENV['APP_ENV']
                ? DebugFlag::INCLUDE_DEBUG_MESSAGE | DebugFlag::INCLUDE_TRACE
                : 0;

            $result = GraphQLBase::executeQuery($schema, $query, null, null, $variables);
            $output = $result->toArray($debugFlags);
        } catch (\Throwable $e) {
            http_response_code(500);

            echo json_encode([
                'errors' => [
                    [
                        'message' => $e->getMessage(),
                        'trace'   => $e->getTraceAsString(),
                    ],
                ],
            ]);

            return;
        }

        header('Content-Type: application/json; charset=UTF-8');
        echo json_encode($output);
    }
}
