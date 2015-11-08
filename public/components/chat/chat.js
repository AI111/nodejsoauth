
var mainModule = angular.module('app.chat', []);

mainModule.factory('socket', ['$rootScope', function ($rootScope) {
    var socket = io.connect();

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

mainModule.controller('ChatController', ['socket', 'Auth', ChatController]);

function ChatController(socket,Auth) {
    var persons = [];

    var chat = this;
    chat.isLoggedIn = Auth.isLoggedIn;
    chat.getCurrentUser = Auth.getCurrentUser;
    chat.msgList =[];
    chat.msg="MSG";
    chat.sendWithSocket = function(msg){
        console.log(msg);
        socket.emit("send", {user:{name:chat.getCurrentUser().name,imgUrl:chat.getCurrentUser().imgUrl},msg:msg});
        chat.msgList.push({msg:msg})

    }

    socket.on("broadcast msg", function(data) {
        console.log(JSON.stringify(data))
        chat.msgList.push({user:data.user,msg:data.msg});
    });

    socket.on("init", function(data) {
        if (!chat.textField)
            chat.textField = "";
        chat.textField += "User connected\n";
    });

}
