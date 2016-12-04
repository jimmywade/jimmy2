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