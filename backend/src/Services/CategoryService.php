<?php

namespace App\Services;

use App\Models\Category\Category;
use App\Repositories\CategoryRepository;

class CategoryService
{
    private CategoryRepository $categoryRepo;

    public function __construct(CategoryRepository $categoryRepo)
    {
        $this->categoryRepo = $categoryRepo;
    }

    public function getAllCategories(): array
    {
        return $this->categoryRepo->findAll();
    }

    public function getCategoryByName(string $name): ?Category
    {
        return $this->categoryRepo->findByName($name);
    }
}
