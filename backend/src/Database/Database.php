<?php

namespace App\Database;

class Database
{
    private \PDO $pdo;

    public function __construct(string $host, string $port, string $dbName, string $user, string $pass)
    {
        $dsn = "mysql:host={$host};port={$port};dbname={$dbName};charset=utf8";

        try {
            $this->pdo = new \PDO($dsn, $user, $pass, [
                \PDO::ATTR_ERRMODE            => \PDO::ERRMODE_EXCEPTION,
                \PDO::ATTR_DEFAULT_FETCH_MODE => \PDO::FETCH_ASSOC,
            ]);
        } catch (\PDOException $e) {
            exit('Database connection failed: ' . $e->getMessage());
        }
    }

    public function executeQuery(string $sql, array $params = [], bool $single = false)
    {
        $stmt = $this->pdo->prepare($sql);
        $stmt->execute($params);

        return $single ? $stmt->fetch() : $stmt->fetchAll();
    }

    public function getConnection(): \PDO
    {
        return $this->pdo;
    }

    public function getLastInsertId(): string
    {
        return $this->pdo->lastInsertId();
    }
}
