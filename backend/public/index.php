<?php

use App\Controller\GraphQLController;
use FastRoute\Dispatcher;
use FastRoute\RouteCollector;

require_once __DIR__ . '/../vendor/autoload.php';

if (file_exists(__DIR__ . '/../config/.env')) {
    $dotenv = Dotenv\Dotenv::createImmutable(__DIR__ . '/../config');
    $dotenv->load();
}

$appEnv = $_ENV['APP_ENV'] ?? 'production';
$isProduction = $appEnv === 'production';

ini_set('display_errors', $isProduction ? '0' : '1');
ini_set('display_startup_errors', $isProduction ? '0' : '1');
ini_set('log_errors', '1');
error_reporting(E_ALL);
ini_set('error_log', __DIR__ . '/../storage/logs/render-error.log');

if (!$isProduction && file_exists(__DIR__ . '/../storage/logs/render-error.log')) {
    echo '<pre>';
    readfile(__DIR__ . '/../storage/logs/render-error.log');
    echo '</pre>';
    unlink(__DIR__ . '/../storage/logs/render-error.log');
    exit;
}

try {
    $container = require __DIR__ . '/../config/container.php';

    $dispatcher = FastRoute\simpleDispatcher(function (RouteCollector $r) {
        $r->post('/graphql', [GraphQLController::class, 'handle']);
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
            $controller = $container->get($controllerClass);
            call_user_func([$controller, $action]);
            break;
    }
} catch (Throwable $e) {
    http_response_code(500);
    echo json_encode([
        'error' => [
            'message' => $isProduction ? 'Internal Server Error' : $e->getMessage(),
            'trace'   => $isProduction ? [] : $e->getTraceAsString(),
        ]
    ]);
}
