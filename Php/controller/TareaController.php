<?php

include_once '../repositorio/usuariosRepository.php';

header('Content-Type: application/json');

$data = json_decode(file_get_contents("php://input"), true);
$response = ['success' => false];

if(isset($data['action'])){
    switch($data['action']){
        case 'registrar_usuario':
            $alias = $data['datos']['alias'];
            $email = $data['datos']['email'];
            $password = $data['datos']['password'];
            
            $resultado = UsuariosRepository::insertarUsuario($alias, $email, $password);

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
        case 'loguear_usuario':
            $emailLogin = $data['datos']['email'];
            $passwordLogin = $data['datos']['password'];
            $resultado = UsuariosRepository::loguearUsuario($emailLogin, $passwordLogin);
            
            if($resultado){
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
