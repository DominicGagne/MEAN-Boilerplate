var Inukbook = angular.module('Inukbook', ['ngRoute', 'ngMaterial', 'Inukbook.controllers', 'Inukbook.factory.requests'])

.run(function(){
	console.log("Project has started.");
})

.config(function($routeProvider, $locationProvider) {
	$routeProvider

	.when('/home', {
		templateUrl: "www/templates/home.html",
		controller: "HomeCtrl"
	})

	.otherwise({
		redirectTo: '/home'
	});

	$locationProvider.html5Mode(false);
});