/**
* This module is an angular factory.
* These are similar to classes, in the sense that
* we can define an object with public and private functions.
**/
var Inukbook = angular.module('Inukbook.factory.requests', [])

.factory('RequestFactory', function($http){

	//helper functions (private)
	//create function to check format and set the 
	return {
		sendPostRequest: function(objWithDataForTheServer, functionName){
		//All of these variable names can be changed.
		//Make sure this link is the correct one.
		    
		    url = "http://localhost:3000/";
		    url+=functionName;
			return $http.get(url, objWithDataForTheServer);
		}
	};
});

