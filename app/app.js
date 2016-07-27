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
    	.otherwise({
    		redirectTo: '/home'
    	});
    }]);

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

  app.controller('ControllerInterfaceAdmin', function($scope, $http, $location, $route){

    $scope.nombreProfesor = "";
    $scope.asignatura = "";
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

  });
