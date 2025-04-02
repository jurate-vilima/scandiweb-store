<?php

namespace App\Repositories;

use App\Database\Database;

class OrderRepository extends BaseRepository
{
    public function __construct(Database $db)
    {
        parent::__construct($db);
    }

    public function createOrder(): int
    {
        $this->db->executeQuery('INSERT INTO orders () VALUES ()');

        return (int) $this->db->getLastInsertId();
    }

    public function insertItem(int $orderId, string $productId, int $qty, float $price, int $currencyId): void
    {
        $this->db->executeQuery(
            'INSERT INTO order_items (order_id, product_id, quantity, price, currency_id)
             VALUES (?, ?, ?, ?, ?)',
            [$orderId, $productId, $qty, $price, $currencyId]
        );
    }
}
