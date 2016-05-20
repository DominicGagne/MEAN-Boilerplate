var Inukbook = angular.module('Inukbook.controllers',[])

//If you are planning on minifying the code after it is complete so that it can be deployed, you need to use Angulars Minifyable style.

//minify style: .controller('exCtrl',['$scope','RequestFactory', function($scope, RequestFactory){}]);
//example controller that can be minified and is angular2 compatible: 
/*.controller('exCtrl',['$scope','RequestFactory', function($scope, RequestFactory){
 var example = this; //This maps the variable example to THIS controller. This also makes your code angular2 compatible and reduces the need to use $scope.
                     //$scope is something to be avoided if you can.
 example.users = []; //Users that can be accessed on the template.                    

 //Below is an example function that the view can interact with.
 example.someFunc = function(){
 
 };
 
 //Example private function, the template cannot call this function but it can be used within the controller.
 someOtherFunc = function(){
 
 };
 
 var someVar; //example var that cannot be used on the template but can be used within the controller.

}])*/

.controller('HomeCtrl',function($scope, $route, $location, RequestFactory, $mdDialog, $mdMedia, $mdSidenav) {
//The above dependancies should be alphabetized with $ dependancies coming before any of the ones that you have created.
//See the above example controller dependancy list.
//Most of the above dependancies are not being used and should be removed if they are not being used.

    $scope.users = [];
    $scope.socketUsers = [];
    var socket = io();


    socket.on('usersInfo', function(usersInfo) {
      console.log("usersInfo:" + usersInfo);
        
        //we need to manually apply any updates received by socket,
        //as they are not part of AngularJS's event loop.
        $scope.$apply(function() {
            $scope.socketUsers = JSON.parse(usersInfo);
        });
    });

    $scope.testGetUsers_socket = function() {
      socket.emit('getUsers', '');
    };

      $scope.testGetUsers_http = function() {
        var promise;
        promise = RequestFactory.sendPostRequest(JSON.stringify({}),"getUsers");
        //The post request is sent to the server, when it comes back:
        promise.then(function(data){
            console.log(data);
            $scope.users = data.data;
        }, function(data){
            console.log("Error from server: ", data);
        });
      };

    $scope.testGetUsers_http(); //These should not be called like this, I assume this was for testing purposes.
    $scope.testGetUsers_socket();

});

//What is this being used for?
//If this directive is needed, it should be in its own file.
Inukbook.directive('dynamic', function ($compile) {
  return {
    restrict: 'A',
    replace: true,
    link: function (scope, ele, attrs) {
      scope.$watch(attrs.dynamic, function(html) {
        ele.html(html);
        $compile(ele.contents())(scope);
      });
    }
  };
});


