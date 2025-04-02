<?php

namespace App\Services;

use App\Repositories\OrderRepository;

class OrderService
{
    private OrderRepository $repo;

    public function __construct(OrderRepository $repo)
    {
        $this->repo = $repo;
    }

    public function createOrder(array $items): string
    {
        $orderId = $this->repo->createOrder();

        foreach ($items as $item) {
            $this->repo->insertItem(
                $orderId,
                $item['productId'],
                $item['quantity'],
                $item['price'],
                $item['currencyId']
            );
        }

        return (string) $orderId;
    }
}
