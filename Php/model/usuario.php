<?php

class Usuarios implements JsonSerializable {

    private $id;
    private $alias;
    private $email;
    private $password;

    public function __construct($id, $alias, $email, $password){
        $this -> id = $id;
        $this -> alias = $alias;
        $this -> email = $email;
        $this -> password = $password;
    }

    public function setID($id){
        $this -> id = $id;
    }

    public function getId(){
        return $this -> id;
    }

    public function setAlias($alias){
        $this -> alias = $alias;
    }

    public function getAlias(){
        return $this -> alias;
    }

    public function setEmail($email){
        $this -> email = $email;
    }

    public function getEmail(){
        return $this -> email;
    }

    public function setPassword($password){
        $this -> password = $password;
    }

    public function getPassword(){
        return $this -> password;
    }

    public function jsonSerialize() : mixed{
        return [
            'id' => $this -> id,
            'alias' => $this -> alias,
            'email' => $this -> email,
            'passowrd' => $this -> password 
        ];
    }

}



?>