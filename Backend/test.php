<?php
$url = 'http://localhost:8888';

$datos_post = http_build_query(
    array(
        'name' => 'contenido',
        'var2' => 'doh'
    )
);

$opciones = array('http' =>
    array(
        'method'  => 'POST',
        'header'  => 'Content-type: application/json',
        'content' => $datos_post
    )
);

$contexto = stream_context_create($opciones);

$resultado = file_get_contents($url,false, $contexto);

print_r($resultado);
 ?>
