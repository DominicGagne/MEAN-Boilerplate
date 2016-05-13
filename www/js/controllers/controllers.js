var Inukbook = angular.module('Inukbook.controllers',[])

.controller('HomeCtrl',function($scope, $route, $location, RequestFactory, $mdDialog, $mdMedia, $mdSidenav) {
    
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

    $scope.testGetUsers_http();
    $scope.testGetUsers_socket();

});


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


