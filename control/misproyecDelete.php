<?php 


if(json_decode(file_get_contents("php://input"))){

	$data = json_decode(file_get_contents("php://input"));
    $codigoParticipante = $data->codigoParticipante;
    $codigoProyecto = $data->codigoProyecto;

}else{

    $codigoParticipante = $_REQUEST['codigoParticipante'];
    $codigoProyecto = $_REQUEST['codigoProyecto'];

}



require_once '../model/Participante.php';
$Participante = new Participante;
$PARTICIPANTE = $Participante->participanteDelete($codigoProyecto);



require_once '../model/Proyecto.php';
$model = new Proyecto;
$PROYECTODELETE = $model->proyectoDelete($codigoProyecto);




$r = array();

if($PARTICIPANTE!=false && $PROYECTODELETE!=false){
	$r['success']=1;
	$r['deleted']=true;
}else{
	$r['success']=0;
	$r['deleted']=false;
}

echo json_encode($r);




