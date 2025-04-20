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
            $response['success'] = $resultado;
            break;
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
