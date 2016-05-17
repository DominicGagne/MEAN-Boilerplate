//This would actually be better as a service instead of a factory.
//I realize that this code was copy pasted from my own work but I have since then updated things.
//A service is better because it is a singleton and there will only ever be a need for 1 request service.
//It is also really easy to implement the rest of the RESTful HTTP calls.
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

