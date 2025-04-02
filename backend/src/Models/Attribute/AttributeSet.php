<?php

namespace App\Models\Attribute;

abstract class AttributeSet
{
    protected string $id;
    protected string $name;
    protected string $type;

    protected array $items = [];

    public function __construct(array $data)
    {
        $this->id    = $data['id']    ?? '';
        $this->name  = $data['name']  ?? '';
        $this->type  = $data['type']  ?? 'text';
        $this->items = $data['items'] ?? [];
    }

    public function getId(): string
    {
        return $this->id;
    }

    public function getName(): string
    {
        return $this->name;
    }

    public function getType(): string
    {
        return $this->type;
    }

    abstract public function getItems(): array;

    public function toArray(): array
    {
        return [
            'id'    => $this->getId(),
            'name'  => $this->getName(),
            'type'  => $this->getType(),
            'items' => $this->getItems(),
        ];
    }
}
