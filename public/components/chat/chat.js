'use strict';

var mainModule = angular.module('app.chat', []);

mainModule.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect('http://localhost:8080/chat');

    return {
        on: function (eventName, callback) {
            function wrapper() {
                var args = arguments;
                $rootScope.$apply(function () {
                    callback.apply(socket, args);
                });
            }

            socket.on(eventName, wrapper);

            return function () {
                socket.removeListener(eventName, wrapper);
            };
        },

        emit: function (eventName, data, callback) {
            socket.emit(eventName, data, function () {
                var args = arguments;
                $rootScope.$apply(function () {
                    if(callback) {
                        callback.apply(socket, args);
                    }
                });
            });
        }
    };
}]);

mainModule.controller('ChatController', ['socket', ChatController]);

function ChatController(socket) {

    var main = this;
    main.msg="MSG";
    main.sendWithSocket = function(msg){
        console.log(msg);
        socket.emit("send", msg);
    }

    socket.on("message", function(data) {
        if (!main.textField)
            main.textField = "";
        main.textField += "client: " + data.msg + "\n";
    });

    socket.on("init", function(data) {
        if (!main.textField)
            main.textField = "";
        main.textField += "User connected\n";
    });

}
