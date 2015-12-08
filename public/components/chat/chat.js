
var chatModule = angular.module('app.chat', []);

chatModule.factory('socket', ['$rootScope','Auth', function ($rootScope,Auth) {
    var socket = io.connect('http://localhost:8080', {
        // Send auth token on connection, you will need to DI the Auth service above
        query: 'token=' + Auth.getToken()
        //path: '/socket.io-client'
    });

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


chatModule.factory('chatService', ['$http', function($http) {
    return {
        getMsg : function(id) {
            return $http.get('/api/rooms/' + id+'/messages');
        },
        getRoom : function(id){
            return $http.get('/api/rooms/' + id);
        },
        getUsers : function(id) {
            return $http.get('/api/rooms/' + id+'/users');
        },
        put : function(id,person,config){
            return $http.put('/api/people/' + id,person,config)
        }
    }
}]);
chatModule.controller('ChatController', ['socket', 'Auth','$routeParams','chatService', ChatController]);

function ChatController(socket,Auth,$routeParams,chatService) {



    var chat = this;
    id = $routeParams.id;
    chat.isLoggedIn = Auth.isLoggedIn;
    chat.getCurrentUser = Auth.getCurrentUser;
    chat.msgList =[];
    chat.users=[]
    chat.usersMap=[]
    chat.msg="MSG";
    chat.isCreator=false;
    chatService.getRoom(id).then(function(res){
       chat.isCreator=res.data.creator==chat.getCurrentUser()._id;
    });
    chatService.getUsers(id).then(function(res) {
        //console.log("Users");
        //console.log(res.data);
        chat.users=res.data;
        chat.users.forEach(function(element, index, array){
            chat.usersMap[element._id]=element;
        });
        //console.log(chat.users);

    });
    chatService.getMsg(id).then(function(res) {
        //console.log("MESSAGAS");
        console.log(res.data);
        //console.log(chat.getCurrentUser());
        chat.msgList=res.data;
    });

    chat.sendWithSocket = function(msg){
        //console.log(msg);
        obj={sender:chat.getCurrentUser()._id,text:msg,sendTime:new Date()};
        socket.emit("send", {user:{name:chat.getCurrentUser().name,imgUrl:chat.getCurrentUser().imgUrl},text:msg});
        chat.msgList.push(obj);

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
