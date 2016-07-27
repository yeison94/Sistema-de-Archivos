<?php


   header("Access-Control-Allow-Origin: *");
   header("Access-Control-Allow-Headers: Origin, X-Requested-With, Content-Type, Accept");
   header('Content-Type: application/json; charset="UTF-8"');


function loginAdm(){

  $username_db = "";
  $password_db = "";
  $username_request = "";
  $password_request = "";

//Obtener el user y password desde la BD
  $mongo = new MongoClient();

  $db = $mongo->selectDB('Administrador');
  $collection = new MongoCollection($db, 'administradors');

  $cursor = $collection->find();

  foreach ($cursor as $doc) {
    $username_db =  $doc["Username"];
    $password_db =  $doc["Contrasena"];

  }
  // echo $username_db;
  // echo $password_db;

  if ($_SERVER['REQUEST_METHOD']){
    parse_str(file_get_contents('php://input'), $post_vars);

    // echo json_encode($post_vars);

    if(($post_vars["name"] == $username_db) and ($post_vars["password"] == $password_db)){

      $result = array('Respuesta' => true );

    }else{

      //Si no coincide el registro
      $result = array('Respuesta' => false );
    }

    $result2 = json_encode($result);

    echo $result2;

  }

}

function interAdm(){

$conexion = new MongoClient();

$coleccion = $conexion->Administrador->oferta;

if ($_SERVER['REQUEST_METHOD'] == "POST"){
  parse_str(file_get_contents('php://input'), $post_vars);

  // echo json_encode($post_vars);

  $doc = array(
    'Nombre' => $post_vars["nameProfesor"]  ,
    'Asignatura' => $post_vars["Asignatura"]);

  $coleccion->insert($doc);

  $result2 = json_encode($doc);

  echo $result2;
}

if($_SERVER['REQUEST_METHOD'] == "GET"){

  $resulado = array();

$cursor = $coleccion->find();

foreach ($cursor as $doc) {

$aux = array('nombre' => $doc['Nombre'],
             'asignatura' => $doc["Asignatura"] );

$resulado[] = $aux;

}

$resultado2 = json_encode($resulado);

echo $resultado2;
}
}

//Para saber de donde procede la solicitud

if ($_SERVER['REQUEST_URI'] == '/AutentificacionAdmin'){

  loginAdm();

}elseif ($_SERVER['REQUEST_URI'] == '/interfaceAdministrador') {

  interAdm();

}else{
  echo "NINGUNO";
}

 ?>
