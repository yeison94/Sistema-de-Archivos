var app = angular.module('app', ['ngRoute']);
    app.config(['$routeProvider',function($routeProvider) {
    	$routeProvider
    	.when('/home',{
    		templateUrl: 'View/Principal.html',
    		controller: 'Ctrl'
    	})
    	.when('/login/Administrador',{
    		templateUrl: 'View/LoginAdmnistrador.html'
    	})
    	.otherwise({
    		redirectTo: '/home'
    	});
    }]);

    app.controller('Ctrl', function($scope){
    	$scope.Variable = "Si FUNCIONA";
    });
