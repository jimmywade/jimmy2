<?php
	class Aportante{

		private $db;

		function __construct() {
			require_once '../db/db_connect.php';
			$this->db = new db_connect();
			$this->db->connect();
		}

		function __destruct() {}


	    private $sql;





	    public function aportanteCreate($codigoAportante,$codigoVoluntario,$codigoProyecto){
	    	$sql = "
		    INSERT INTO aportantes (codigoAportante, codigoProyecto, codigoVoluntario, estadoAportante, aceptadoAportante) 
		    VALUES ('".$codigoAportante."', '".$codigoProyecto."', '".$codigoVoluntario."', '1','1')
	    	";
	    	
			$result = mysqli_query($this->db->connect(), $sql);
			//var_dump($result);
			$rows = array();
	        if($result==true){
	        	$r['success']=1;
				$r['inserted']=true;
				$rows[] = $r;
	        }else{
	        	$r['success']=0;
				$r['inserted']=false;
				$rows[] = $r;
	        }
		    echo json_encode($rows);

	    }





	    public function aportanteRead($codigoVoluntario){
			$sql = " 
			SELECT * FROM aportantes,voluntarios,proyectos,temas,imagenes
			WHERE aportantes.estadoAportante = 1
			AND aportantes.codigoProyecto = proyectos.codigoProyecto
			AND temas.codigoTema = proyectos.codigoTema
			AND proyectos.codigoProyecto = imagenes.codigoProyecto
			AND aportantes.codigoVoluntario = voluntarios.codigovoluntario
			AND voluntarios.codigoVoluntario = '$codigoVoluntario'
			AND proyectos.estadoProyecto = 1
			ORDER BY fechaProyecto DESC
			";

			$result = mysqli_query($this->db->connect(), $sql);
			if($result != false){
		        $rows = array();
					while($r = mysqli_fetch_array($result)){
		                $rows[] = $r;
			        }
			        echo json_encode($rows);
			}else{
				echo 'problema al consultar mi listado en la bd';
			}
	    }




		public function aportanteDelete($codigoVoluntario,$codigoProyecto){
			$sql = "
			UPDATE aportantes
            SET estadoAportante='0'
			WHERE codigoVoluntario='$codigoVoluntario'
            AND codigoProyecto='$codigoProyecto' 

	    	";
			$result = mysqli_query($this->db->connect(), $sql);
			var_dump($result);
		}









	}