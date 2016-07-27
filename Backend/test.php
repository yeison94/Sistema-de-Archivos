<?php

header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
header('Content-Type: application/json; charset="UTF-8"');

// $url = 'http://localhost:8888';
//
// $datos_post = http_build_query(
//     array(
//         'name' => 'contenido',
//         'var2' => 'doh'
//     )
// );
//
// $opciones = array('http' =>
//     array(
//         'method'  => 'POST',
//         'header'  => 'Content-type: application/json',
//         'content' => $datos_post
//     )
// );
//
// $contexto = stream_context_create($opciones);
//
// $resultado = file_get_contents($url,false, $contexto);
//
// print_r($resultado);

$prueba = array();

$prueba[] = ["hola","chao"];
$prueba[] = ["chao"];

print_r($prueba);

 ?>
