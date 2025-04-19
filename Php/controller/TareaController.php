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
    }
}

echo json_encode($response);
