<?php
include_once '../model/Tareas.php';
include_once '../conexionDB/ConexionDB.php';

class TareasRepository{

    public static function insertTarea($nombre, $descripcion, $completada, $id_usuario){

        try{
            $conexion = ConectionDB::getInstance()->getConnection();
            if($conexion){
                $sql = "INSERT INTO tareas(nombre, descripcion, completada, id_usuario) VALUES(:nombre, :descripcion, :completada, :id_usuario)";
                $stmt = $conexion->prepare($sql);
                
                $executeResult = $stmt -> execute([
                    ':nombre' => $nombre,
                    ':descripcion' => $descripcion,
                    ':completada' => $completada,
                    ':id_usuario' => $id_usuario
                ]);

                if($executeResult){
                    return true;
                }
                else{
                    return false;
                }
            }
            else{
                return false;
            }
        }catch (PDOException $e) {
            $errorCode = $e->errorInfo[1]; 
            if ($errorCode == 1062) {
                return ['success' => false, 'error' => 'duplicado'];
            } else {
                return ['success' => false, 'error' => 'otro'];
            }
            return false;
        }

    }

    public static function selectTareasUser($id_usuario) {
        try {
            $conexion = ConectionDB::getInstance()->getConnection();
            if ($conexion) {
                $sql = "SELECT * FROM tareas WHERE id_usuario = :id_usuario";
                $stmt = $conexion->prepare($sql);
                $stmt->execute([':id_usuario' => $id_usuario]);
    
                $filas = $stmt->fetchAll(PDO::FETCH_ASSOC);
    
                if ($filas) {
                    $tareas = [];
                    foreach ($filas as $fila) {
                        $tareas[] = new Tareas($fila['nombre'], $fila['descripcion'], $fila['completada'], $fila['id_usuario']);
                    }
                    return $tareas;
                } else {
                    return []; 
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