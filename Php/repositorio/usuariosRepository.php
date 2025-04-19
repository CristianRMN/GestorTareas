<?php

include_once '../model/usuario.php';
include_once '../conexionDB/ConexionDB.php';

class UsuariosRepository {

    public static function insertarUsuario($alias, $email, $password) {
        try {
            $conexion = ConectionDB::getInstance()->getConnection();

            if ($conexion) {
                $sql = "INSERT INTO usuarios(alias, email, password) VALUES(:alias, :email, :password)";
                $stmt = $conexion->prepare($sql);
               
                $executeResult = $stmt->execute([
                    ':alias' => $alias,
                    ':email' => $email,
                    ':password' => $password
                ]);

                if ($executeResult) {
                    return true;
                } else {
                    $errorInfo = $stmt->errorInfo();
                    var_dump($errorInfo);
                    return false;
                }
            } else {
                return false;
            }

        } catch (PDOException $e) {
            var_dump($e->getMessage());
            return false;
        }
    }

}

?>

