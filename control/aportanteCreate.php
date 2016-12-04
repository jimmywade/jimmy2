<?php


//setear codigo
require_once '../control/Date.php';
$Date = new Date;
$date = $Date -> joinDateTime();

require_once '../control/Aleatorio.php';
$Random = new Aleatorio;
$random = $Random ->setRandom();



$codigoAportante = 'apo-'.$date.$random;

if(json_decode(file_get_contents("php://input"))){
	$data = json_decode(file_get_contents("php://input"));

	$codigoVoluntario = $data->codigoVoluntario;
	$codigoProyecto = $data->codigoProyecto;
	
}else{
	$codigoVoluntario = $_REQUEST['codigoVoluntario'];
	$codigoProyecto = $_REQUEST['codigoProyecto'];
}



require_once '../model/Aportante.php';
$Aportante = new Aportante;
$APORTANTE = $Aportante->aportanteCreate($codigoAportante, $codigoVoluntario, $codigoProyecto);

?>