<?php

namespace App\Repositories;

use App\Database\Database;

class QueryBuilder
{
    protected Database $db;
    protected string $table     = '';
    protected array $fields     = [];
    protected array $joins      = [];
    protected array $conditions = [];
    protected array $bindings   = [];
    protected ?string $orderBy  = null;
    protected ?int $limit       = null;
    protected ?int $offset      = null;

    public function __construct(Database $db)
    {
        $this->db = $db;
    }

    public function table(string $table): self
    {
        $this->table = $table;

        return $this;
    }

    public function select(array $fields = ['*']): self
    {
        $this->fields = $fields;

        return $this;
    }

    public function join(string $table, string $on, string $type = 'INNER'): self
    {
        $this->joins[] = strtoupper($type) . " JOIN {$table} ON {$on}";

        return $this;
    }

    public function where(string $column, string $operator, $value): self
    {
        $paramName                  = ':' . str_replace('.', '_', $column) . count($this->bindings);
        $this->conditions[]         = "{$column} {$operator} {$paramName}";
        $this->bindings[$paramName] = $value;

        return $this;
    }

    public function orderBy(string $column, string $direction = 'ASC'): self
    {
        $this->orderBy = "{$column} " . strtoupper($direction);

        return $this;
    }

    public function limit(int $limit, int $offset = 0): self
    {
        $this->limit  = $limit;
        $this->offset = $offset;

        return $this;
    }

    public function getQuery(): string
    {
        $fields = implode(', ', $this->fields);
        $sql    = "SELECT {$fields} FROM {$this->table}";

        if (!empty($this->joins)) {
            $sql .= ' ' . implode(' ', $this->joins);
        }

        if (!empty($this->conditions)) {
            $sql .= ' WHERE ' . implode(' AND ', $this->conditions);
        }

        if ($this->orderBy) {
            $sql .= " ORDER BY {$this->orderBy}";
        }

        if (null !== $this->limit) {
            $sql .= " LIMIT {$this->limit}";
            if ($this->offset) {
                $sql .= " OFFSET {$this->offset}";
            }
        }

        return $sql;
    }

    public function get(): array
    {
        $query = $this->getQuery();

        return $this->db->executeQuery($query, $this->bindings);
    }
}
