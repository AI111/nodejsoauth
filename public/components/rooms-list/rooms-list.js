// модуль для вывода списка людей
var roomsModule = angular.module('app.roomsList', ['ngMaterial']);

// фабрика (сервис) для получения информации с базы данных через API
roomsModule.factory('roomsService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/rooms');
        },
        delete : function(id,config) {
            return $http.delete('/api/rooms/' + id,config);
        },
        create : function(personData) {
            return $http.post('/api/rooms', personData);
        }
    }
}]);

roomsModule.factory('socket', ['$rootScope', function ($rootScope) {
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

// контроллер модуля 'app.peopleList'
// ЗАМЕТКА: обратить внимание на имя контроллера: 'app.peopleList' => 'PeopleListController'
roomsModule.controller('RoomsListController', ['roomsService','$location','$mdDialog','$mdToast','Auth', RoomsListController]);

function RoomsListController(roomsService,$location,$mdDialog,$mdToast,Auth) {

    var roomsList = this;
    roomsList.isLoggedIn = Auth.isLoggedIn;
    roomsList.getCurrentUser = Auth.getCurrentUser;
    roomsList.tmpPerson={};
    roomsList.go = function ( id ) {
        console.log("go")
        $location.path( '/chat/'+roomsList.list[id]._id );
    };
    roomsList.showAdd = function(ev) {
        socket.emit("send", {user:{name:chat.getCurrentUser().name,imgUrl:chat.getCurrentUser().imgUrl},msg:msg});
    };
    roomsList.deletePerson = function(id){
        peopleService.delete(roomsList.list[id]._id)
            .then(function(res){
                    $mdToast.show(
                        $mdToast.simple().content('Deleted')
                    );
                    roomsList.list.splice(id,1);
                },
                function(err){
                    $mdToast.show(
                        $mdToast.simple().content('Deleted')
                    );
                });
    }
    roomsService.get().then(function(result) {
        roomsList.list = result.data;
        console.log(roomsList.list);
    });
}
