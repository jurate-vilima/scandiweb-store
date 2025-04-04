<?php

use App\Controller\GraphQLController;
use App\Database\Database;
use App\Http\Request;
use App\Repositories\CategoryRepository;
use App\Repositories\OrderRepository;
use App\Repositories\ProductRepository;
use App\Schema\MutationType;
use App\Schema\QueryType;
use App\Services\CategoryService;
use App\Services\CurrencyService;
use App\Services\OrderService;
use App\Services\ProductService;
use DI\ContainerBuilder;

return (function () {
    $builder = new ContainerBuilder();

    $builder->useAutowiring(false);

    $builder->addDefinitions([
        Database::class => function () {
            $host   = $_ENV['DB_HOST'];
            $port   = $_ENV['DB_PORT'];
            $dbName = $_ENV['DB_NAME'];
            $user   = $_ENV['DB_USER'];
            $pass   = $_ENV['DB_PASS'];

            return new Database($host, $port, $dbName, $user, $pass);
        },

        Request::class => \DI\create(Request::class),

        ProductService::class => function ($c) {
            return new ProductService($c->get(ProductRepository::class));
        },
        CategoryService::class => function ($c) {
            return new CategoryService($c->get(CategoryRepository::class));
        },
        CurrencyService::class => function () {
            return new CurrencyService();
        },
        OrderService::class => fn ($c) => new OrderService($c->get(OrderRepository::class)),

        CategoryRepository::class => function ($c) {
            return new CategoryRepository($c->get(Database::class));
        },
        ProductRepository::class => function ($c) {
            return new ProductRepository(
                $c->get(Database::class),
                $c->get(CurrencyService::class),
                $c->get(CategoryService::class)
            );
        },
        OrderRepository::class => fn ($c) => new OrderRepository($c->get(Database::class)),

        QueryType::class => function ($c) {
            return new QueryType($c->get(CategoryService::class), $c->get(ProductService::class));
        },
        MutationType::class => fn ($c) => new MutationType($c->get(OrderService::class)),

        GraphQLController::class => function ($c) {
            return new GraphQLController(
                $c->get(ProductService::class),
                $c->get(CategoryService::class),
                $c->get(QueryType::class),
                $c->get(MutationType::class),
                $c->get(Request::class)
            );
        },
    ]);

    return $builder->build();
})();
