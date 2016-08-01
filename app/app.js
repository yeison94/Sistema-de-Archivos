var app = angular.module('app', ['ngRoute']);
    app.config(['$routeProvider',function($routeProvider) {
    	$routeProvider
    	.when('/home',{
    		templateUrl: 'View/Principal.html',
    		controller: 'Ctrl'
    	})
    	.when('/loginAdministrador',{
    		templateUrl: 'View/LoginAdmnistrador.html',
			controller: 'ControllerAdmin'
    	})
      .when('/interfaceAdministrador',{
        templateUrl: 'View/InterfaceAdministrador.html',
        controller: 'ControllerInterfaceAdmin'
      })
      .when('/loginProfesor',{
        templateUrl: 'View/loginProfesor.html',
        controller: 'ControllerProfe'
      })
      .when('/interfaceProfesor',{
        templateUrl : 'View/interfaceProfesor.html',
        controller:'controllerInterfaceProf'
      })
    	.otherwise({
    		redirectTo: '/home'
    	});
    }]);

  app.directive('uploadFiles', function () {
    return {
        scope: true,        //create a new scope
        link: function (scope, el, attrs) {
            el.bind('change', function (event) {
                var files = event.target.files;
                //iterate files since 'multiple' may be specified on the element
                for (var i = 0; i < files.length; i++) {
                    //emit event upward
                    scope.$emit("seletedFile", { file: files[i] });
                }
            });
        }
    };
  });

  //Servicio utilizado para compartir datos entre algunos controladores
  app.factory("ServicioDatos" ,function(){
    var ret = function(){}
    ret.datosCompatidos = "Valor";
    return ret;
  });

  app.controller('Ctrl', function($scope){
  	$scope.Variable = "Si FUNCIONA";
  });

	app.controller('ControllerAdmin', function($scope, $http, $location){

    //Usado para los avisos de datos ingresados correcto o incorrectos
    $scope.comprobar = "";
    $scope.comprobar2 = true;

		$scope.verificarAdmi = function(){

      var req = {
        method : 'POST',
        url : "http://localhost:8888/AutentificacionAdmin",
        headers: {
          'Content-Type' : 'application/json'
        },
        data: $.param({ name : $scope.Adm.user , password : $scope.Adm.password})
      };

      $http(req)
      .then(function(res){
        //window.alert(res.data.query.NombreRsquest + " " + res.data.query.NombreDB);
        console.log('Success', res.data);
        $scope.comprobar = res.data.Respuesta;
        $scope.comprobar2 = false;

        if ($scope.comprobar == true) {

          $location.path('/interfaceAdministrador');


        }

      });


			//window.alert("$scope.Adm.user + $scope.Adm.password");
		};
	});

  app.controller('ControllerProfe', function($scope, $http, $location, ServicioDatos){

    //Usado para los avisos de datos ingresados correcto o incorrectos
    $scope.comprobar = "";
    $scope.comprobar2 = true;
    $scope.vara = "";
    $scope.servicio = ServicioDatos;
    //ServicioDatos.datosCompatidos = "Probando";

    $scope.verificarProf = function(){

      var req = {
        method : 'POST',
        url : "http://localhost:8888/AutentificacionProf",
        headers: {
          'Content-Type' : 'application/json'
        },
        data: $.param({ name : $scope.Profe.nomb , password : $scope.Profe.pass})
      };

      $http(req)
      .then(function(res){
        //window.alert(res.data.query.NombreRsquest + " " + res.data.query.NombreDB);
        console.log('Success', res.data);
        $scope.comprobar = res.data.Respuesta;
        $scope.comprobar2 = false;

        if ($scope.comprobar == true) {

          ServicioDatos.datosCompatidos = res.data.Materia;

          $location.path('/interfaceProfesor');


        }

      });


      //window.alert("$scope.Adm.user + $scope.Adm.password");
    };

  });

  app.controller('ControllerInterfaceAdmin', function($scope, $http, $location, $route){

    $scope.nombreProfesor = "";
    $scope.asignatura = "";
    $scope.contras = "";
    $scope.oferta = [];

    //Peticion para obtener datos y llenar la tabla con la oferta academica
    $http({
      method: 'GET',
      url: "http://localhost:8888/interfaceAdministrador"
      }).then(function (response) {
        $scope.oferta = response.data;
        console.log(response.data);
        // this callback will be called asynchronously
        // when the response is available
      });

    $scope.agregarProfesor = function(){
      var req = {
        method : 'POST',
        url : "http://localhost:8888/interfaceAdministrador",
        headers: {
          'Content-Type' : 'application/json'
        },
        data: $.param({ nameProfesor : $scope.nombreProfesor , Asignatura : $scope.asignatura, Contrasena : $scope.contras})
      };

      $http(req)
      .then(function(res){
        //window.alert(res.data.query.NombreRsquest + " " + res.data.query.NombreDB);
        console.log('Success', res.data);

          //$location.path('/interfaceAdministrador');
          $route.reload();

      });
    }

    $scope.eliminarProfesor = function(){

      var req = {
        method : 'DELETE',
        url : "http://localhost:8888/interfaceAdministrador",
        headers: {
          'Content-Type' : 'application/json'
        },
        data: $.param({ nameProfesor : $scope.nombreProfesor , Asignatura : $scope.asignatura})
      };

      $http(req)
      .then(function(res){
        //window.alert(res.data.query.NombreRsquest + " " + res.data.query.NombreDB);
        console.log('Success', res.data);

          //$location.path('/interfaceAdministrador');
          $route.reload();

      });
    }

    $scope.cerrarSesion = function(){

        $location.path('/loginAdministrador');

    }

  });

  app.controller('controllerInterfaceProf',function($scope,ServicioDatos, $http){

    $scope.servicio = ServicioDatos;
    console.log($scope.servicio.datosCompatidos);

    //1. Used to list all selected files
    $scope.files = [];

    //2. a simple model that want to pass to Web API along with selected files
    $scope.jsonData = {
        name: "Jignesh Trivedi",
        comments: "Multiple upload files"
    };
    //3. listen for the file selected event which is raised from directive
    $scope.$on("seletedFile", function (event, args) {
        $scope.$apply(function () {
            //add the file object to the scope's files collection
            $scope.files.push(args.file);
        });
    });

    //4. Post data and selected files.
    $scope.save = function () {
        $http({
            method: 'POST',
            url: "http://localhost:8888/interfaceProfesor",
            headers: { 'Content-Type': 'application/json' },

            transformRequest: function (data) {
                var formData = new FormData();
                formData.append("model", angular.toJson(data.model));
                for (var i = 0; i < data.files.length; i++) {
                    formData.append("file" + i, data.files[i]);
                }
                return formData;
            },
            data: { model: $scope.jsonData, files: $scope.files }
        }).
        success(function (data, status, headers, config) {
            alert("success!");
            console.log(data);
        }).
        error(function (data, status, headers, config) {
            alert("failed!");
        });
    };

  })
