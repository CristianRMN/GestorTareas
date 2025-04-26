<?php

class Tareas implements JsonSerializable{

    private $id;
    private $nombre;
    private $descripcion;
    private $completada;
    private $id_usuario;

    public function __construct($nombre, $descripcion, $completada, $id_usuario){
        $this -> nombre = $nombre;
        $this -> descripcion = $descripcion;
        $this -> completada = $completada;
        $this -> id_usuario = $id_usuario;
    }

    public function setID($id){
        $this -> id = $id;
    }

    public function getId(){
        return $this -> id;
    }

    public function setNombre($nombre){
        $this -> nombre = $nombre;
    }

    public function getNombre(){
        return $this -> nombre;
    }

    public function setDescripcion($descripcion){
        $this -> descripcion = $descripcion;
    }

    public function getDescripcion(){
        return $this -> descripcion;
    }

    public function setCompletada($completada){
        $this -> completada = $completada;
    }

    public function getCompletada(){
        return $this -> completada;
    }

    public function setId_usuario($id_usuario){
        $this -> id_usuario = $id_usuario;
    }

    public function getId_usuario(){
        return $this -> id_usuario;
    }

    public function jsonSerialize() : mixed{
        return [
            'id' => $this -> id,
            'nombre' => $this -> nombre,
            'descripcion' => $this -> descripcion,
            'completada' => $this -> completada,
            'id_usuario' => $this -> id_usuario
        ];
    }
}

?>

