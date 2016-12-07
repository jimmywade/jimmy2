
var app = angular.module('activateEmbalate',['ngFileUpload']);




app.controller('proyectos', ['$http', '$scope', 'Upload', function ($http, $scope, Upload){



/*
*********************************************************************************************
Estudiantes
*********************************************************************************************
*/



    $scope.crearUsuario = function(hide,show) {
        var hide=hide;
        var show=show;
        if( $scope.contrasenaUsuario == $scope.contrasenaUsuario){

            if( 
                ($scope.ieUsuario!=undefined)&&($scope.ieUsuario!='')
                &&($scope.nombreUsuario!=undefined)&&($scope.nombreUsuario!='')
                &&($scope.emailUsuario!=undefined)&&($scope.emailUsuario!='')
                &&($scope.contrasenaUsuario!=undefined)&&($scope.contrasenaUsuario!='')
                ){

                $scope.estudianteRead = [];

                $http.post("../control/estudianteCreate.php", {'codigoInstitucion':$scope.ieUsuario,'nombreEstudiante':$scope.nombreUsuario,'emailEstudiante':$scope.emailUsuario,'passwordEstudiante':$scope.contrasenaUsuario})
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
                var fa = document.getElementById("errr");
                fa.style.display = "block";
                var borde = document.getElementById("errrr");
                borde.style.border = "solid 2px red";
            }

        }else{

            var fa = document.getElementById("err");
            fa.style.display = "block";
            var borde = document.getElementById("errrr");
            borde.style.border = "solid 2px red";
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
            
            console.log('imagen subida');
            console.log('---resp---');
            console.log(resp.data);
            console.log('imagen subida');
            console.log('imagen subida');

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
    




    //set codigo imagen
    $scope.setCodigoImagen=function(newCodigoImagen){
        $scope.codigoImagen2 = newCodigoImagen; 
        console.log('codigo-imagen es: ');
        console.log($scope.codigoImagen2);
    }




    //set values default
    $scope.setDefaultValues=function(){
        $scope.errorLogin = "";
        $scope.aviso3 ="";
        $scope.student="";
        $scope.h1 = "";
        $scope.divActive = "";
        $scope.meses = "";
        $scope.codigoProyecto = "";
        $scope.months = "";
        $scope.indice = "";
        $scope.miIndice = "";
    }





    //default
    $scope.setDefaultViews=function(){
        if(!$scope.estudianteRead || !proyectosRead){
            off('estudianteCreate');
            on('estudianteRead');
            //off('estudianteUpdate');
            off('estudianteDelete');
            off('proyectosCreate');
            off('proyectosRead');
            off('proyectosDetalle');
        }
    }




    //perfilRead login
    $scope.buttonPerfilRead=function(){

        if(
            ($scope.emailEstudiante!=undefined)&&($scope.emailEstudiante!='')
            &&($scope.passwordEstudiante!=undefined)&&($scope.passwordEstudiante!='')
            ){
                $scope.estudianteRead = [];
                $http.post("../control/estudianteRead.php", {
                    'emailEstudiante':$scope.emailEstudiante,
                    'passwordEstudiante':$scope.passwordEstudiante
            })
            .success(function(datos,status,headers,config){
                console.log('------- DATOS: ------');
                console.log(datos);
                $scope.estudianteRead = datos;

                //setear el estudiante
                $scope.student = $scope.estudianteRead[0].codigoEstudiante;
                $scope.success = $scope.estudianteRead[0].success;
                console.log('------------');
                console.log($scope.student);
                
                //validar si success es true
                if(($scope.student!=undefined)&&($scope.student!="")&&($scope.success==1)){
                    //load todos los proyectos
                    $scope.listado = [];
                    $http.get("../control/proyectoRead.php")
                        .success(function(data,status,headers,config){
                        
                        console.log('--- LISTADO PROYECTOS: ----');
                            console.log(data);
                            $scope.listado = data;
                        console.log('------------------');
                            
                            if(($scope.listado!=undefined)&&($scope.listado!='')&&($scope.listado!='[]')&&($scope.listado!='{}')){
                                on_off('estudianteRead','proyectosRead');
                                on('mainMenu');
                                $scope.h1 = "Activate y embalate";
                                $scope.divActive = "proyectosRead";
                               
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
    $scope.setEstudiante=function(student){
       var student = student;
       $scope.student = student;
       localStorage.setItem('student', student);
       valor = localStorage.getItem('student');
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
        $scope.esteToken = localStorage.getItem('student');    
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





/*

    $scope.proyectosLoad=function(hhh,sss){

        $http.get("../control/proyectoRead.php")
                    .success(function(data,status,headers,config){
                        console.log(data);
                        $scope.listado = data;
                        
                        if(($scope.listado!=undefined)&&($scope.listado!='')&&($scope.listado!='[]')&&($scope.listado!='{}')){
                            off(hhh);
                            on(sss);

                        }else{
                            console.log('no projects to reach');
                        }
                        
                    })
                    .error(function(err){
                        console.log('cannot reach projects from db');
                    });
    }
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
    




    $scope.proyectoInsert=function(hx,sx){

        $scope.student = localStorage.getItem('student');

        if(
              ($scope.student!=undefined&&$scope.student!='')
            &&($scope.elegidoTema!=undefined&&$scope.elegidoTema!='')
            &&($scope.nombreProyecto!=undefined&&$scope.nombreProyecto!='')

            &&($scope.problemaProyecto!=undefined&&$scope.problemaProyecto!='')
            &&($scope.objetivoProyecto!=undefined&&$scope.objetivoProyecto!='')
            &&($scope.especificoProyecto!=undefined&&$scope.especificoProyecto!='')

            &&($scope.resultadoProyecto!=undefined&&$scope.resultadoProyecto!='')
            &&($scope.actividadProyecto!=undefined&&$scope.actividadProyecto!='')
            &&($scope.beneficiarioProyecto!=undefined&&$scope.beneficiarioProyecto!='')

            &&($scope.areaProyecto!=undefined&&$scope.areaProyecto!='')
            &&($scope.valorProyecto!=undefined&&$scope.valorProyecto!='')
            &&($scope.duracionProyecto!=undefined&&$scope.duracionProyecto!='')
        ){

                $http.post("../control/proyectoCreate.php", {'codigoEstudiante':$scope.student,'elegidoTema':$scope.elegidoTema,'nombreProyecto':$scope.nombreProyecto,'problemaProyecto':$scope.problemaProyecto,'objetivoProyecto':$scope.objetivoProyecto,'especificoProyecto':$scope.especificoProyecto,'actividadProyecto':$scope.actividadProyecto,'resultadoProyecto':$scope.resultadoProyecto,'valorProyecto':$scope.valorProyecto,'beneficiarioProyecto':$scope.beneficiarioProyecto,'areaProyecto':$scope.areaProyecto,'duracionProyecto':$scope.duracionProyecto })
                    .success(function(data,status,headers,config){ 
                        console.log('---- DATA: ----- ');
                        console.log(data);
                        //$scope.afterUpdate = data;
                        console.log('---- STATUS: ----- ');
                        console.log(status);
                        console.log('---- HEADERS: ----- ');
                        console.log(headers);
                        console.log('---- CONFIG: ----- ');
                        console.log(config);
                        console.log('........................ ');

                        $scope.hx=hx;
                        $scope.sx=sx;
                        console.log('el div a esconder es ' + $scope.hx);
                        console.log('........................ ');

                        console.log('el div a mostrar es es ' + $scope.sx);
                        console.log('........................ ');

                        var foo = $scope.proyectosReadApply();
                        var foo = $scope.hs(hx,sx);
                        var foo = $scope.setDivActive('proyectosRead');

                        console.log('.-.-.-.-.-.-.-.-.-.-.- ');
                    })
                    .error(function(err){
                                console.log('error');
                                console.log(err);
                            });                   
                
        }else{
            //jQuery('#myModal').modal('show');
            $scope.aviso3 = 'Faltan datos importantes, Todos los campos son necesarios';
        }
        
    }





    $scope.esteProyecto=function(indice,codigoProyecto,duracionProyecto){
        $scope.indice = indice;

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

                        $scope.$apply(function(){   
                                                    $scope.listado;
                                               });
                        },500
                  );

    }









/*
*********************************************************************************************
Mis proyectos 
*********************************************************************************************
*/





    //mis proyectos
    $scope.misProyectos = function(h,s){

        var miLi = $scope.miListado();


                setTimeout(function(){ 

                                                           
                                                    if(($scope.mispro!=undefined)&&($scope.mispro!='')&&($scope.mispro!='[]')&&($scope.mispro!='{}')){
                                                        off(h);
                                                        on(s);
                                                        var anything = $scope.setDivActive(s);
                                                        return true;
                                                    }else{
                                                        console.log('no se pudo acceder a miListado');
                                                        return false;
                                                    }


                        },500
                  );


    }
    




    //mis proyectos
    $scope.miListado = function(){
               
        $scope.mispro = [];

        $scope.esteEstudiante = localStorage.getItem('student');

        $http.post("../control/misproRead.php", {'esteEstudiante':$scope.esteEstudiante})
            .success(function(data,status,headers,config){
                console.log('------MI LISTADO-----');
                console.log(data);
                console.log('----------------------');
                $scope.mispro = data;

            })
            .error(function(err){
                console.log('no fue posible consultar mis proyectos');
            });
    }
    






    $scope.esteProyectoMisproyec=function(miIndice,codigoProyecto,duracionProyecto){
        $scope.miIndice = miIndice;

        if(duracionProyecto < 30){
            $scope.meses = 'mes';
        }else{
            $scope.meses = 'meses';
        }
        $scope.months = duracionProyecto / 30;
        
    }







    // upload logo
    $scope.uploadLogo = function (file,codigoEsteLogo,h,s){

        Upload.upload({
            url: '../control/logoUpdate.php',
            data: {file: file, 'codigoImagen':codigoEsteLogo}
        }).then(function (resp) {
            console.log('Success ' + resp.config.data.file.name + 'uploaded. Response: ' + resp.data);

           
        }, function (resp) {
            console.log('Error status: ' + resp.status);
        }, function (evt) {
            var progressPercentage = parseInt(100.0 * evt.loaded / evt.total);
            console.log('progress: ' + progressPercentage + '% ' + evt.config.data.file.name);
            

            console.log('----RELOADING miListado-----');
            var reloadSoloMisProyectos = $scope.miListado();


                setTimeout(function(){ 
                                                           
                                        console.log('-----APPLYING miListado-----');
                                        var misProyectosApply = $scope.miListadoApply();
                                        var oculto = $scope.hs(h,s);

                        },2000
                );
            



        });

    };






/*

    //mis proyectos
    $scope.soloMisProyectos = function(hh,ss){
               
        $scope.mispro = [];soloMisProyectosApply

        $scope.esteEstudiante = localStorage.getItem('student');

        $http.post("../control/misproRead.php", {'esteEstudiante':$scope.esteEstudiante})
            .success(function(data,status,headers,config){
                console.log('------------MIS PROYECTOS----------');
                console.log(data);
                console.log('----------------------');
                $scope.mispro = data;
                
                //refresca $scope.mispro
                if(($scope.mispro!=undefined)&&($scope.mispro!='')&&($scope.mispro!='[]')&&($scope.mispro!='{}')){
                    var cualquiera = $scope.soloMisProyectosApply();
                }else{
                    console.log('WARNING: no se pudo refrescar la funcion soloMisProyectosApply');
                }
            })
            .error(function(err){
                console.log('no fue posible consultar mis proyectos');
            });

            return true;
    }
    
*/





    //proyectos read cambio
    $scope.miListadoApply = function(){

        setTimeout(function(){ 

                        $scope.$apply(function(){   

                                                    $scope.miListado();

                                               });
                        },500
                  );

    }


   






    $scope.mysproDelete=function(codeProyecto2){
        $scope.codeProyecto2 = codeProyecto2;
        $scope.studento = localStorage.getItem('student');
        $http.post("../control/misproDelete.php", {'codigoProyecto':$scope.codeProyecto2,'codigoEstudiante':$scope.studento})
            .success(function(data,status,headers,config){ 
                console.log(data);
                $scope.afterDelete = data;
            })
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

        timer7 = setTimeout(function(){ $scope.divActive = active; }, 300);

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


