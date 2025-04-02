<?php

namespace App\Repositories;

use App\Database\Database;
use App\Factories\CategoryFactory;
use App\Models\Category\Category;

class CategoryRepository
{
    private Database $db;
    private string $table = 'categories';

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function findAll(array $requestedFields = ['id', 'name']): array
    {
        $fields       = implode(',', $requestedFields);
        $sql          = "SELECT {$fields} FROM {$this->table}";
        $categoryRows = $this->db->executeQuery($sql);

        $categories = [];
        foreach ($categoryRows as $category) {
            $categories[] = CategoryFactory::create($category);
        }

        return $categories;
    }

    public function findByName(string $name): ?Category
    {
        $sql  = "SELECT * FROM {$this->table} WHERE name = :name LIMIT 1";
        $data = $this->db->executeQuery($sql, [':name' => $name], true);

        return $data ? CategoryFactory::create($data) : null;
    }

    public function findById(string $id): ?Category
    {
        $data = $this->db->executeQuery("SELECT * FROM {$this->table} WHERE id = ?", [$id], true);

        return $data ? CategoryFactory::create($data) : null;
    }
}
