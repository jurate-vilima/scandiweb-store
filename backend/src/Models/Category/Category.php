<?php

namespace App\Models\Category;

abstract class Category
{
    protected int $id;
    protected string $name;

    public function __construct(array $data = [])
    {
        $this->id   = $data['id']   ?? 0;
        $this->name = $data['name'] ?? '';
    }

    public function getId(): int
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getDisplayName(): string
    {
        return $this->name;
    }

    public function isFilterable(): bool
    {
        return false;
    }
}
