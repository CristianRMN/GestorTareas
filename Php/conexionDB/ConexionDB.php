<?php

$host = 'localhost:3307';
$dbname = 'tareasdb';
$username = 'root';
$password = '123456789';

class ConectionDB {

    private static $instance = null;
    private $pdo; 

    private function __construct() {
        global $host, $dbname, $username, $password;

        try {
            $dns = "mysql:host=$host;dbname=$dbname;charset=utf8";
            // Establecer la conexión
            $this->pdo = new PDO($dns, $username, $password);
        } catch (PDOException $e) {
            echo "Error de conexion: " . $e->getMessage();
        }
    }

    public static function getInstance() {
        if (self::$instance === null) {
            self::$instance = new ConectionDB();
        }

        return self::$instance;
    }

    public function getConnection() {
        return $this->pdo;
    }

}

$conexion = ConectionDB::getInstance()->getConnection();

?>
