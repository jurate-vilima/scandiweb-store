<?php

use App\Controller\GraphQLController;
use App\Controller\Main;
use FastRoute\Dispatcher;
use FastRoute\RouteCollector;

ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

require_once __DIR__ . '/../vendor/autoload.php';

try {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../config');
    $dotenv->load();

    $container = require __DIR__ . '/../config/container.php';

    $dispatcher = FastRoute\simpleDispatcher(function (RouteCollector $r) {
        $r->post('/graphql', [GraphQLController::class, 'handle']);
        $r->get('/', [Main::class, 'main']);
    });

    $routeInfo = $dispatcher->dispatch($_SERVER['REQUEST_METHOD'], $_SERVER['REQUEST_URI']);

    switch ($routeInfo[0]) {
        case Dispatcher::NOT_FOUND:
            http_response_code(404);
            echo json_encode(['error' => ['message' => '404 Not Found']]);

            break;

        case Dispatcher::METHOD_NOT_ALLOWED:
            http_response_code(405);
            echo json_encode(['error' => ['message' => '405 Method Not Allowed']]);

            break;

        case Dispatcher::FOUND:
            [$controllerClass, $action] = $routeInfo[1];
            $controller                 = $container->get($controllerClass);
            call_user_func([$controller, $action]);

            break;
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode(['error' => ['message' => $e]]);
}
