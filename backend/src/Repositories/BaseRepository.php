<?php

namespace App\Repositories;

use App\Database\Database;

abstract class BaseRepository
{
    protected Database $db;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    protected function createPlaceholders(array $values): string
    {
        return rtrim(str_repeat('?,', count($values)), ',');
    }

    protected function groupBy(array $rows, string $groupByKey, string $valueKey): array
    {
        $grouped = [];
        foreach ($rows as $row) {
            $grouped[$row[$groupByKey]][] = $row[$valueKey];
        }

        return $grouped;
    }

    protected function createQueryBuilder(): QueryBuilder
    {
        return new QueryBuilder($this->db);
    }
}
