var msg = angular.module('msg', []);

msg.controller('msgCtrl', ['$scope', '$http','socket' , function($scope, $http, socket){
	
  var user = window.prompt("Enter votre nom ? ","Username");

  window.addEventListener('load', function () {
    Notification.requestPermission(function (status) {
      // Cela permet d'utiliser Notification.permission avec Chrome/Safari
      if (Notification.permission !== status) {
        Notification.permission = status;
      }
    });
  });

  $scope.message = {
    user: user,
    message: "",
    color: "#36B0FF"
  }

  socket.emit('users', {user: $scope.message.user});

	$http.get('/messages').success(function(response) {
		$scope.messages = response;
	});

	socket.on('new message', function (message) {
		console.log(message);
	    $scope.messages.push(message);

      if (window.Notification && Notification.permission !== "denied" && $scope.message.user == message.user ) {
        var n = new Notification(message.user, {body: message.message});
      }
	});
  socket.on('users', function (user) {
    if (window.Notification && Notification.permission !== "denied") {
        var n = new Notification(user.user + " is Connected", {});
    }
  });

	$scope.send = function() {
		$http.post('/new', $scope.message).success(function(response) {
			console.log('data sent !!');
      $scope.message.message = "";
		});
	};

  $scope.setColor = function(color) {
    $scope.message.color = color;
  };
}]);

msg.factory('socket', function ($rootScope) {
  var socket = io.connect();
  return {
    on: function (eventName, callback) {
      socket.on(eventName, function () {  
        var args = arguments;
        $rootScope.$apply(function () {
          callback.apply(socket, args);
        });
      });
    },
    emit: function (eventName, data, callback) {
      socket.emit(eventName, data, function () {
        var args = arguments;
        $rootScope.$apply(function () {
          if (callback) {
            callback.apply(socket, args);
          }
        });
      })
    }
  };
});