<?php

namespace App\Repositories;

use App\Database\Database;
use App\Factories\ProductFactory;
use App\GraphQL\Mapping\ProductFieldMapper;
use App\Models\Product\Product;
use App\Services\CategoryService;
use App\Services\CurrencyService;

class ProductRepository extends BaseRepository
{
    private CurrencyService $currencyService;
    private CategoryService $categoryService;
    private string $table = 'products';

    public function __construct(Database $db, CurrencyService $currencyService, CategoryService $categoryService)
    {
        parent::__construct($db);
        $this->currencyService = $currencyService;
        $this->categoryService = $categoryService;
    }

    public function findAll(array $requestedFields = ['id', 'name', 'description', 'in_stock', 'brand']): array
    {
        $fields = implode(',', $requestedFields);
        $sql    = "SELECT {$fields} FROM {$this->table}";

        return $this->db->executeQuery($sql);
    }

    public function findById(string $id, array $sqlColumns = [], array $graphQLFields = []): ?Product
    {
        if (empty($sqlColumns)) {
            $sqlColumns = ProductFieldMapper::toSqlColumns($graphQLFields);
        }

        $qb = $this->createQueryBuilder();
        $qb->table('products p')
            ->select($sqlColumns)
            ->join('categories c', 'p.category_id = c.id')
            ->where('p.id', '=', $id)
            ->limit(1)
        ;

        $rows = $qb->get();

        if (empty($rows)) {
            return null;
        }

        $row = $rows[0];

        if (in_array('price', $graphQLFields, true) || in_array('currency', $graphQLFields, true)) {
            $this->loadPricesForMany($rows);
        }

        if (in_array('attributes', $graphQLFields, true)) {
            $this->loadAttributesForMany($rows);
        }

        if (
            in_array('gallery', $graphQLFields, true)
        ) {
            $this->loadGalleriesForMany($rows, $graphQLFields);
        }

        return ProductFactory::create($rows[0]);
    }

    public function findByCategory(string $category, array $columns = [], array $graphQLFields = []): array
    {
        if (empty($columns)) {
            $columns = [
                'p.id AS id',
                'p.name AS name',
                'p.description AS description',
                'p.in_stock AS inStock',
                'p.brand AS brand',
                'c.name AS category',
            ];
        }
        $selectColumns = implode(',', $columns);

        $qb = $this->createQueryBuilder();
        $qb->table('products p')
            ->select(explode(',', $selectColumns))
            ->join('categories c', 'p.category_id = c.id')
        ;

        $categoryObj = $this->categoryService->getCategoryByName($category);
        if ($categoryObj && $categoryObj->isFilterable()) {
            $qb->where('c.name', '=', $category);
        }

        $rows = $qb->get();
        if (!$rows) {
            return [];
        }

        if (in_array('price', $graphQLFields, true) || in_array('currency', $graphQLFields, true)) {
            $this->loadPricesForMany($rows);
        }
        if (in_array('attributes', $graphQLFields, true)) {
            $this->loadAttributesForMany($rows);
        }
        if (
            in_array('gallery', $graphQLFields, true)
            || in_array('images', $graphQLFields, true)
            || in_array('mainImage', $graphQLFields, true)
        ) {
            $this->loadGalleriesForMany($rows, $graphQLFields);
        }

        $products = [];
        foreach ($rows as $row) {
            $products[] = ProductFactory::create($row);
        }

        return $products;
    }

    private function loadPricesForMany(array &$rows): void
    {
        $ids = array_column($rows, 'id');
        if (empty($ids)) {
            return;
        }
        $placeholders = $this->createPlaceholders($ids);
        $sql          = "
            SELECT pr.product_id, pr.price, cur.symbol AS currency
            FROM prices pr
            JOIN currencies cur ON pr.currency_id = cur.id
            WHERE pr.product_id IN ({$placeholders})
        ";
        $priceRows = $this->db->executeQuery($sql, $ids);
        $priceMap  = [];
        foreach ($priceRows as $pRow) {
            $priceMap[$pRow['product_id']] = [
                'price'    => (float) $pRow['price'],
                'currency' => $pRow['currency'],
            ];
        }
        foreach ($rows as &$row) {
            if (isset($priceMap[$row['id']])) {
                $row['price']    = $priceMap[$row['id']]['price'];
                $row['currency'] = $priceMap[$row['id']]['currency'];
            }
        }
    }

    private function loadAttributesForMany(array &$rows): void
    {
        $ids = array_column($rows, 'id');
        if (empty($ids)) {
            return;
        }
        $placeholders = $this->createPlaceholders($ids);
        $sql          = "
            SELECT pa.product_id, a.id AS attribute_id, a.name, a.type, pa.value, pa.display_value
            FROM product_attributes pa
            JOIN attributes a ON pa.attribute_id = a.id
            WHERE pa.product_id IN ({$placeholders})
            ORDER BY a.id, pa.id
        ";
        $attrRows = $this->db->executeQuery($sql, $ids);
        $attrMap  = [];
        foreach ($attrRows as $r) {
            $pid = $r['product_id'];
            if (!isset($attrMap[$pid])) {
                $attrMap[$pid] = [];
            }
            $attrId = $r['attribute_id'];
            if (!isset($attrMap[$pid][$attrId])) {
                $attrMap[$pid][$attrId] = [
                    'id'    => $r['attribute_id'],
                    'name'  => $r['name'],
                    'type'  => $r['type'],
                    'items' => [],
                ];
            }
            $attrMap[$pid][$attrId]['items'][] = [
                'value'        => $r['value'],
                'displayValue' => $r['display_value'],
            ];
        }
        foreach ($rows as &$row) {
            if (isset($attrMap[$row['id']])) {
                $row['attributes'] = array_values($attrMap[$row['id']]);
            }
        }
    }

    private function loadGalleriesForMany(array &$rows, array $graphQLFields): void
    {
        $needsMainImage = in_array('mainImage', $graphQLFields, true);
        $needsAllImages = in_array('images', $graphQLFields, true) || in_array('gallery', $graphQLFields, true);
        if (!$needsMainImage && !$needsAllImages) {
            return;
        }
        $ids = array_column($rows, 'id');
        if (empty($ids)) {
            return;
        }
        $placeholders = $this->createPlaceholders($ids);
        if ($needsMainImage && !$needsAllImages) {
            $sql = "
                SELECT pi.product_id, pi.image_url
                FROM product_images pi
                INNER JOIN (
                    SELECT product_id, MIN(id) AS min_id
                    FROM product_images
                    WHERE product_id IN ({$placeholders})
                    GROUP BY product_id
                ) AS first_img ON pi.product_id = first_img.product_id AND pi.id = first_img.min_id
            ";
        } else {
            $sql = "
                SELECT product_id, image_url
                FROM product_images
                WHERE product_id IN ({$placeholders})
                ORDER BY id ASC
            ";
        }
        $galleryRows = $this->db->executeQuery($sql, $ids);
        $galleryMap  = $this->groupBy($galleryRows, 'product_id', 'image_url');
        foreach ($rows as &$row) {
            $row['gallery'] = $galleryMap[$row['id']] ?? [];
        }
    }
}
