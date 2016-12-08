<?php 

if(json_decode(file_get_contents("php://input"))){
	$data = json_decode(file_get_contents("php://input"));
	$codigoEstudiante=$data->codigoEstudiante;
	$codigoProyecto=$data->codigoProyecto;
}else{
	$codigoEstudiante=$_REQUEST['codigoEstudiante'];
	$codigoProyecto=$_REQUEST['codigoProyecto'];
}


require_once '../model/Estudiante.php';
$Estudiante = new Estudiante;
$ESTUDIANTE = $Estudiante->misaportantesRead($codigoEstudiante,$codigoProyecto);