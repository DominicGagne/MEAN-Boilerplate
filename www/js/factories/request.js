var Inukbook = angular.module('Inukbook.factory.requests', [])

.factory('RequestFactory', function($http){

	//helper functions (private)
	//create function to check format and set the 
	return {
		sendPostRequest: function(objWithDataForTheServer, functionName){
		    url = "http://localhost:3000/";
		    url+=functionName;
			return $http.get(url, objWithDataForTheServer);
		}
	};
});

