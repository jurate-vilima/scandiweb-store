<?php

namespace App\Models\Product;

use App\Models\Category\Category;

abstract class Product
{
    protected string $id;
    protected string $name;
    protected string $brand;
    protected string $description;
    protected bool $inStock;
    protected array $gallery = [];

    protected array $attributes = [];

    protected float $price;
    protected string $currency;

    protected ?Category $categoryObject = null;

    public function __construct(array $data = [])
    {
        $this->setId((string) ($data['id'] ?? ''));
        $this->setName((string) ($data['name'] ?? ''));
        $this->setBrand((string) ($data['brand'] ?? ''));
        $this->setDescription((string) ($data['description'] ?? ''));
        $this->setInStock(!empty($data['inStock']) || !empty($data['in_stock']));
        $this->setGallery($data['gallery'] ?? []);
        $this->setAttributes($data['attributes'] ?? []);
        $this->setPrice((float) ($data['price'] ?? 0.0));
        $this->setCurrency((string) ($data['currency'] ?? ''));
        $this->setCategory($data['category'] ?? null);
    }

    public function setId(string $id): void
    {
        $this->id = $id;
    }

    public function setName(string $name): void
    {
        $this->name = $name;
    }

    public function setBrand(string $brand): void
    {
        $this->brand = $brand;
    }

    public function setDescription(string $description): void
    {
        $this->description = $description;
    }

    public function setInStock(bool $inStock): void
    {
        $this->inStock = $inStock;
    }

    public function setGallery(array $gallery): void
    {
        $this->gallery = $gallery;
    }

    public function setAttributes(array $attributes): void
    {
        $this->attributes = $attributes;
    }

    public function setPrice(float $price): void
    {
        $this->price = $price;
    }

    public function setCurrency(string $currency): void
    {
        $this->currency = $currency;
    }

    public function setCategory(?Category $category): void
    {
        $this->categoryObject = $category;
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getBrand(): string
    {
        return $this->brand;
    }

    public function getDescription(): string
    {
        return $this->description;
    }

    public function isInStock(): bool
    {
        return $this->inStock;
    }

    public function getGallery(): array
    {
        return $this->gallery;
    }

    public function getAttributes(): array
    {
        return $this->attributes;
    }

    public function getPrice(): float
    {
        return $this->price;
    }

    public function getCurrency(): string
    {
        return $this->currency;
    }

    public function getMainImage(): ?string
    {
        return $this->gallery[0] ?? null;
    }

    public function getCategory(): ?Category
    {
        return $this->categoryObject;
    }

    public function getAttributeValue(string $attributeName): ?string
    {
        foreach ($this->attributes as $attr) {
            if (strtolower($attr->getName()) === strtolower($attributeName)) {
                return $attr->getItems()[0]['value'] ?? null;
            }
        }

        return null;
    }
}
