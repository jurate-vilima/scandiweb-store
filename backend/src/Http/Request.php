<?php

namespace App\Http;

class Request
{
    private string $method;
    private string $uri;
    private array $headers;
    private array $body;

    public function __construct()
    {
        $this->method  = $_SERVER['REQUEST_METHOD'] ?? 'GET';
        $this->uri     = $_SERVER['REQUEST_URI']       ?? '/';
        $this->headers = getallheaders();

        $rawInput   = file_get_contents('php://input');
        $this->body = json_decode($rawInput, true) ?? [];
    }

    public function getMethod(): string
    {
        return $this->method;
    }

    public function getUri(): string
    {
        return $this->uri;
    }

    public function getHeader(string $key): ?string
    {
        return $this->headers[$key] ?? null;
    }

    public function getBody(): array
    {
        return $this->body;
    }

    public function input(string $key, $default = null)
    {
        return $this->body[$key] ?? $default;
    }
}
