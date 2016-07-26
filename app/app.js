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
    	.otherwise({
    		redirectTo: '/home'
    	});
    }]);

    app.controller('Ctrl', function($scope){
    	$scope.Variable = "Si FUNCIONA";
    });

	app.controller('ControllerAdmin', function($scope, $http){

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

      });


			//window.alert("$scope.Adm.user + $scope.Adm.password");
		};
	});
