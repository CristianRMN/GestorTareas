<?php
include_once '../repositorio/TareasRepository.php';
header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$response = ['success' => false];

if(isset($data['action'])){
switch($data['action']){

    case 'registro_tareas':
        $nombre = $data['datos']['nombre'];
        $descripcion = $data['datos']['descripcion'];
        $completada = $data['datos']['completada'];
        $id_usuario = $data['datos']['id_usuario'];
        $resultado = TareasRepository::insertTarea($nombre, $descripcion, $completada, $id_usuario);
        if (is_array($resultado) && isset($resultado['error'])) {
            echo json_encode([
                'success' => false,
                'error' => $resultado['error']
            ]);
        } elseif ($resultado === true) {
            echo json_encode([
                'success' => true,
                'registro' => true
            ]);
        } else {
            echo json_encode([
                'success' => false,
                'error' => 'otro'
            ]);
        }
        exit;
        case 'selectTareas':
            $id_usuario = $data['datos']['id_usuario'];
            $resultado = TareasRepository::selectTareasUser($id_usuario);
            if($resultado){
                echo json_encode([
                    'success' => true,
                    'usuario' => $resultado
                ]);
            }
            else{
                echo json_encode([
                    'success' => false,
                    'mensaje' => 'no hay tareas'
                ]);
            }
            exit;


}
}

/*
<?php

            $resultado = UsuariosRepository::loguearUsuario($emailLogin, $passwordLogin);
            
            if($resultado){
                $_SESSION['usuario'] = [
                    'id' => $resultado -> getId(),
                    'alias' => $resultado -> getAlias(),
                    'email' => $resultado -> getEmail()
                ];
                echo json_encode([
                    'success' => true,
                    'usuario' => $resultado
                ]);
            }
            else{
                echo json_encode([
                    'success' => false,
                    'mensaje' => 'Credenciales incorrectas'
                ]);
            }
            exit;
    }
}

echo json_encode($response);

*/
?>