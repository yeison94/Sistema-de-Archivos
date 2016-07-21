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

	app.controller('ControllerAdmin', function($scope){

		$scope.Adm = {};

		$scope.verificarAdmi = function(){
			window.alert($scope.Adm.user + $scope.Adm.password);
		};
	});
