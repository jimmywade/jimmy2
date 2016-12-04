
var app = angular.module('Embalate',['ngFileUpload']);




app.controller('projects', ['$http', '$scope', 'Upload', function ($http, $scope, Upload){



/*
*********************************************************************************************
Estudiantes
*********************************************************************************************
*/



    $scope.crearUsuario = function(hide,show) {

        if( $scope.passwordUsuario == $scope.passwordUsuario2){
            

            if( 
                ($scope.paisUsuario!=undefined)&&($scope.paisUsuario!='')
                &&($scope.ciudadUsuario!=undefined)&&($scope.ciudadUsuario!='')
                &&($scope.nombreUsuario!=undefined)&&($scope.nombreUsuario!='')
                &&($scope.telefonoUsuario!=undefined)&&($scope.telefonoUsuario!='')
                &&($scope.direccionUsuario!=undefined)&&($scope.direccionUsuario!='')
                &&($scope.emailUsuario!=undefined)&&($scope.emailUsuario!='')
                &&($scope.passwordUsuario!=undefined)&&($scope.passwordUsuario!='')
                ){
                
                if( ($scope.identificacionUsuario == undefined)||($scope.identificacionUsuario == '') ){ $scope.identificacionUsuario = 'N/A'; }

                $scope.volunteerLogin = [];

                $http.post("../control/voluntarioCreate.php", {'idPais':$scope.paisUsuario,'idCiudad':$scope.ciudadUsuario,'nombreVoluntario':$scope.nombreUsuario,'identificacionVoluntario':$scope.direccionUsuario,'telefonoVoluntario':$scope.telefonoUsuario,'direccionVoluntario':$scope.direccionUsuario,'emailVoluntario':$scope.emailUsuario,'passwordVoluntario':$scope.passwordUsuario})
                .success(function(data,status,headers,config){ 
                    console.log(data);
                    console.log(status);
                    console.log(headers);
                    console.log(config);
                    $scope.esteData = data;
                    off(hide);
                    on(show);
                })
                .error(function(err){

                });
            }else{
                /*
                var fa = document.getElementById("errr");
                fa.style.display = "block";
                var borde = document.getElementById("errrr");
                borde.style.border = "solid 2px red";
                */
                $scope.erText = 'Fatan datos importantes';
            }

        }else{
            $scope.erText = 'Passwords doesn´t match';
        }
    }



    // upload later on form submit or something similar
    $scope.submit = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };



    // upload on file select or drop
    $scope.upload = function (file) {
        $scope.ztudent = localStorage.getItem('student');
        //alert($scope.ztudent);

        Upload.upload({
            url: '../control/picanteUpdate.php',
            data: {file: file, 'username': $scope.username,'esteEstudiante':$scope.ztudent}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);

        });


        timer = setTimeout(xxx, 2500);

    };


    /*
    
    // for multiple files:
    $scope.uploadFiles = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          Upload.upload({..., data: {file: files[i]}, ...})...;
        }
        // or send them all together for HTML5 browsers:
        Upload.upload({..., data: {file: files}, ...})...;
      }
    }     
    */






    // upload later on form submit or something similar
    $scope.submit2 = function() {
      if ($scope.form.file.$valid && $scope.file) {
        $scope.upload($scope.file);
      }
    };



    // upload on file select or drop
    $scope.upload2 = function (file) {
        
        
        Upload.upload({
            url: '../control/imageUpdate.php',
            data: {file: file, 'username': $scope.username,'codigoImagen':$scope.codigoImagen2}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);

            /*
            if(resp.data){
                timer3 = setTimeout($scope.proyectosLoad('misproyecUpdate','proyectosRead'), 3000);
            }
            */
           
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            


        });

        

    };



    /*
    // for multiple files:
    $scope.uploadFiles = function (files) {
      if (files && files.length) {
        for (var i = 0; i < files.length; i++) {
          Upload.upload({..., data: {file: files[i]}, ...})...;
        }
        // or send them all together for HTML5 browsers:
        Upload.upload({..., data: {file: files}, ...})...;
      }
    }     
    */

 

    
    
    function xxx(){
        $scope.esteToken = localStorage.getItem('student');    
        $scope.myprofi = [];

        $http.post("../control/myprofiRead.php",{'esteToken':$scope.esteToken})
            .success(function(data,status,headers,config){
                console.log(data);
                $scope.myprofi = data;
                
                if(($scope.myprofi!=undefined)&&($scope.myprofi!='')&&($scope.myprofi!='[]')&&($scope.myprofi!='{}')){
                    off('imageUpdate');
                    on('imageEstudiante');
                }
            })
            .error(function(err){
                console.log('no fue posible consultar este perfil');
            });
    }
    



    //set values default
    $scope.setDefaultValues=function(){
        $scope.errorLogin = "";
        $scope.erText = '';
        $scope.aviso3 ="";
        $scope.student="";
        $scope.h1 = "";
        $scope.divActive = "";
        $scope.meses = "";
        $scope.codigoProyecto = "";
        $scope.months = "";
        $scope.indice = "";
        $scope.miIndice = "";
        $scope.emailVoluntario = "mili@gmail.com";
        $scope.passwordVoluntario = "12345";
    }





    //default
    $scope.setDefaultViews=function(){
        if(!$scope.volunteerLogin || !proyectosRead){
            off('volunteerCreate');
            on('volunteerLogin');
            //off('estudianteUpdate');
            off('volunteerDelete');
            off('proyectosCreate');
            off('proyectosRead');
            off('proyectosDetalle');
        }
    }




    //perfilRead login
    $scope.buttonPerfilRead=function(){

        if(
            ($scope.emailVoluntario!=undefined)&&($scope.emailVoluntario!='')
            &&($scope.passwordVoluntario!=undefined)&&($scope.passwordVoluntario!='')
            ){
                $scope.volunteerLogin = [];
                $http.post("../control/voluntarioLogin.php", {
                    'emailVoluntario':$scope.emailVoluntario,
                    'passwordVoluntario':$scope.passwordVoluntario
            })
            .success(function(datos,status,headers,config){
                console.log('------- DATOS: ------');
                console.log(datos);
                $scope.volunteerLogin = datos;

                //setear el estudiante
                $scope.voluntario = $scope.volunteerLogin[0].codigoVoluntario;
                $scope.success = $scope.volunteerLogin[0].success;
                console.log('------------');
                console.log($scope.voluntario);
                
                //validar si success es true
                if(($scope.voluntario!=undefined)&&($scope.voluntario!="")&&($scope.success==1)){
                    //load todos los proyectos
                    $scope.listado = [];
                    $http.get("../control/proyectoRead.php")
                        .success(function(data,status,headers,config){
                        
                        console.log('--- LISTADO PROYECTOS: ----');
                            console.log(data);
                            $scope.listado = data;
                        console.log('--- LISTADO PROYECTOS: ----');
                            
                            if(($scope.listado!=undefined)&&($scope.listado!='')&&($scope.listado!='[]')&&($scope.listado!='{}')){
                                on_off('volunteerLogin','proyectosRead');
                                on('mainMenu');
                                $scope.h1 = "Activate y embalate";
                                $scope.divActive = "proyectosRead";
                                var setearVoluntario = $scope.setVoluntario($scope.voluntario);
                                console.log('------- ULTIMO IF ------');
                                console.log('------- ULTIMO IF ------');
                                console.log('------- ULTIMO IF ------');
                                console.log('------- ULTIMO IF ------');

                            }else{
                                $scope.loginFailed();
                            }
                        })
                        .error(function(err){
                            console.log('no se pudo consultar');
                        });
                }else{
                    $scope.loginFailed();
                }
                 

            }); 

        }else{
            $scope.loginFailed();
        }
        
    }





    $scope.bordeAvisoClear=function(){
        var borde = document.getElementById("bordeAviso");
        borde.style.border = "0px";
        $scope.errorLogin = "";
    }




    //setear estudiante
    $scope.setVoluntario=function(volunteer){
       localStorage.setItem('volunteer', volunteer);
       valorActual = localStorage.getItem('volunteer');
       //alert(valorActual);
    }





    $scope.loginFailed=function(){
        $scope.errorLogin = "Oops! ...parece que faltan datos importantes";
        var fa = document.getElementById("mensajeAviso");
        fa.style.display = "block";
        var borde = document.getElementById("bordeAviso");
        borde.style.border = "solid 2px red";
    }




    //consultar datos perfil este estudiante
    $scope.myProfile=function(hide,show){
        var whine = whine;         
        var kotch = kotch;
        $scope.esteToken = localStorage.getItem('volunteer');    
        $scope.myprofi = [];

        $http.post("../control/myprofiRead.php",{'esteToken':$scope.esteToken})
            .success(function(data,status,headers,config){
                console.log(data);
                $scope.myprofi = data;
                
                if(($scope.myprofi!=undefined)&&($scope.myprofi!='')&&($scope.myprofi!='[]')&&($scope.myprofi!='{}')){
                    off(hide);
                    on(show);
                }
            })
            .error(function(err){
                console.log('no fue posible consultar este perfil');
            });

    }






/*
*********************************************************************************************
Proyectos 
*********************************************************************************************
*/






    $scope.temaRead=function(){

        $scope.temas = [];
        $http.get("../control/temaRead.php")
            .success(function(data){
                console.log(data);
                $scope.temas = data;
            })
            .error(function(err){
                console.log('error al consultar los temas');
            }); 
    }
    



     

    $scope.listarTodo=function(){

        //load todos los proyectos
        $scope.listado = [];
        $http.get("../control/proyectoRead.php")
            .success(function(data,status,headers,config){
            
            console.log('--- LISTADO PROYECTOS2: ----');
                console.log(data);
                $scope.listado = data;
            console.log('--- LISTADO PROYECTOS2: ----');
                
                if(($scope.listado!=undefined)&&($scope.listado!='')&&($scope.listado!='[]')&&($scope.listado!='{}')){
                    on_off('volunteerLogin','proyectosRead');
                    on('mainMenu');
                    $scope.h1 = "Activate y embalate";
                    $scope.divActive = "proyectosRead";
                    var setearVoluntario = $scope.setVoluntario($scope.voluntario);
                    console.log('------- ULTIMO IF2 ------');
                    console.log('------- ULTIMO IF2 ------');
                    console.log('------- ULTIMO IF2 ------');
                    console.log('------- ULTIMO IF2 ------');

                }else{
                    $scope.loginFailed();
                }
            })
            .error(function(err){
                console.log('no se pudo consultar2');
            });

        var refrescar = $scope.proyectosReadApply();
    }


                   



    $scope.esteProyecto=function(indice,codigoProyecto,duracionProyecto){
        $scope.indice = indice;
        //alert('el indice enviado es: ' + $scope.indice);

        if(duracionProyecto < 30){
            $scope.meses = 'mes';
        }else{
            $scope.meses = 'meses';
        }
        $scope.months = duracionProyecto / 30;
        
    }




  
    //proyectos read cambio
    $scope.proyectosReadApply = function(){

        setTimeout(function(){ 
                        $scope.$apply(function(){   //alert('Scope indice: ' + $scope.indice);
                                                    $scope.listado;
                                                    console.log('Listado refrescado');
                                               });
                        },500
                  );

    }








/*
*********************************************************************************************
Mis proyectos 
*********************************************************************************************
*/




    $scope.convertirmeVoluntario = function(h,s,codeProject){
                       
        $scope.aportante = [];

        $scope.esteVolunteer = localStorage.getItem('volunteer');

        $http.post("../control/aportanteCreate.php", {'codigoVoluntario':$scope.esteVolunteer,'codigoProyecto':codeProject})
            .success(function(data,status,headers,config){
                console.log('----se creo aportante?----');
                console.log(data);
                console.log('----------------------');
                $scope.aportante = data;

                if(($scope.aportante!=undefined)&&($scope.aportante!='')&&($scope.aportante!='[]')&&($scope.aportante!='{}')){

                    // el llamado a las demas funciones y despues el apague y prenda
                    var actualizarMisProyectos = $scope.miListadoRead(h,s);
 
                }else{
                    console.log('problema al consultar');
                }
            })
            .error(function(err){
                console.log('no fue posible crear este aportante');
            });

    }





    //mis proyectos
    $scope.miListadoRead = function(h,s){
                            
        $scope.miListado = [];

        $scope.esteVolunteer = localStorage.getItem('volunteer');

        $http.post("../control/miListadoRead.php", {'esteVoluntario':$scope.esteVolunteer})
            .success(function(data,status,headers,config){
                console.log('------------Mi Listado----------');
                console.log(data);
                console.log('----------------------');
                $scope.miListado = data;

                if(($scope.miListado!=undefined)&&($scope.miListado!='')&&($scope.miListado!='[]')&&($scope.miListado!='{}')){

                    // el llamado a refrescar miListado
                    var refrescarMiListado = $scope.miListadoApply();
                    
                    //prende y apaga
                    off(h);
                    on(s);

                    //setea este div como el activo
                    var setaqui = $scope.setDivActive(s);

                }else{
                    console.log('problem al consultar');
                }
            })
            .error(function(err){
                console.log('no fue posible consultar mis proyectos');
            });

    }
    








    $scope.esteProyectoMisproyec=function(miIndice,codigoProyecto,duracionProyecto){

        
        alert('hola chao');
        alert(miIndice);
        $scope.miIndice = miIndice;
        //alert('miIndice enviado es: ' + $scope.miIndice);

        if(duracionProyecto < 30){
            $scope.meses = 'mes';
        }else{
            $scope.meses = 'meses';
        }
        $scope.months = duracionProyecto / 30;
        
    }





    //proyectos read cambio
    $scope.miListadoApply = function(){

        setTimeout(function(){ 
                        $scope.$apply(function(){   //alert('Scope indice: ' + $scope.indice);
                                                    $scope.miListado;
                                                    console.log('Aportante refrescado');
                                               });
                        },500
                  );

    }






/*
*********************************************************************************************
Efectos visuales 
*********************************************************************************************
*/




    //hide and show 
    $scope.hs=function(h,s){
        off(h);
        on(s);
    }




    //turn off current , turn on main
    $scope.showSingle=function(este){
        on(este);
    }




    //turn off este
    $scope.hideSingle=function(este){
        off(este);
    }




    //turn off current , turn on main
    $scope.show=function(este,main){
        var este= este;
        var main = main;
        off(este);
        on(main);
        off('menuLayout');
        off('menuLayout2');
        off('menuLayout3');
        off('menuLayout4');
        off('menuLayout10');
    }


    //turn off este
    $scope.h1=function(tituloH1){
        $scope.h1 = tituloH1;
    }




    //turn off este
    $scope.setDivActive=function(active){
        timer7 = setTimeout(function(){ $scope.divActive = active; 
            //alert($scope.divActive); 
            //console.log('-----Div activo = ------'); 
            //console.log($scope.divActive); 
        }, 300);
        
    }












    //reload 
    $scope.proyectosReload=function(){
        location.reload();
    }




    //reload 
    $scope.destruirSesion=function(){
        var student = undefined;
        $scope.student = student;
        localStorage.setItem('student', student);
        valor = localStorage.getItem('student');
        location.reload();
    }

    





}]);






app.filter('cortarTexto', function(){
  return function(input, limit){
    return (input.length > limit) ? input.substr(0, limit)+'...' : input;
  };
})


