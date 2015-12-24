
var chatModule = angular.module('app.chat', []);

chatModule.factory('socket', ['$rootScope','Auth', function ($rootScope,Auth) {
    var socket = io.connect('http://localhost:8080', {
        // Send auth token on connection, you will need to DI the Auth service above
        //query: 'token=' + Auth.getToken()
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
        getContacts : function(){
            return $http.get('/api/users/contacts');
        },
        put : function(id,person,config){
            return $http.put('/api/people/' + id,person,config)
        }
    }
}]);
chatModule.controller('ChatController', ['socket', 'Auth','$routeParams','chatService','$timeout', '$q', ChatController]);

function ChatController(socket,Auth,$routeParams,chatService,$timeout, $q) {



    var chat = this;
    id = $routeParams.id;
    chat.isLoggedIn = Auth.isLoggedIn;
    chat.getCurrentUser = Auth.getCurrentUser;
    id = $routeParams.id;
    thisUser=chat.getCurrentUser();
    chat.querySearch = querySearch;
    chat.contacts ;
    chat.allContacts;
    chat.filterSelected = true;

    chat.msgList =[];

    chat.usersMap=[]
    chat.msg="MSG";
    chat.isCreator=false;

    socket.emit("init",{user:thisUser._id, room:id});

    chatService.getRoom(id).then(function(res){
       chat.isCreator=res.data.creator==chat.getCurrentUser()._id;
        if(chat.isCreator){
            chatService.getContacts().then(function(res){
                chat.allContacts=res.data;
            });
        }
    });

    chatService.getUsers(id).then(function(res) {
        //console.log("Users");
        //console.log(res.data);
        chat.contacts=res.data;
        chat.contacts.forEach(function(element, index, array){
            chat.usersMap[element._id]=element;
        });
        console.log(chat.usersMap);

    });
    chatService.getMsg(id).then(function(res) {
        console.log("MESSAGAS");
        console.log(res.data);
        //console.log(chat.getCurrentUser());
        chat.msgList=res.data;
    });



    chat.sendWithSocket = function(msg){
        //console.log(msg);
        if(msg.length==0)return;
        obj={sender:chat.getCurrentUser()._id,text:msg,imgUrl:chat.getCurrentUser().imgUrl,sendTime:new Date()};
        socket.emit("send", obj);
        addMsg(obj);

    }

    socket.on("broadcast msg", function(data) {
        console.log(JSON.stringify(data))
        addMsg(data);
    });

    function addMsg(msg){
        console.log(msg)
        chat.msgList.push(msg);
        $timeout(function() {
            var scroller = document.getElementById("autoscroll");
            scroller.scrollTop = scroller.scrollHeight;
        }, 0, false);
    }




    function querySearch (query) {
        var results = query ?
            chat.allContacts.filter(createFilterFor(query)) : [];
        return results;
    }
    /**
     * Create filter function for a query string
     */
    function createFilterFor(query) {
        var lowercaseQuery = angular.lowercase(query);
        return function filterFn(contact) {
            return (contact.name.toLowerCase().indexOf(lowercaseQuery) != -1);;
        };
    }

}
