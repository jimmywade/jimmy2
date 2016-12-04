<?php 

if(json_decode(file_get_contents("php://input"))){
	$data = json_decode(file_get_contents("php://input"));
	$esteVoluntario=$data->esteVoluntario;
}else{
	$esteVoluntario=$_REQUEST['esteVoluntario'];
}


require_once '../model/Aportante.php';
$Voluntario = new Aportante;
$VOLUNTARIO = $Voluntario->AportanteRead($esteVoluntario);