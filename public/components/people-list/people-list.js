// модуль для вывода списка людей
var peopleModule = angular.module('app.peopleList', ['ngMaterial']);

// фабрика (сервис) для получения информации с базы данных через API
peopleModule.factory('peopleService', ['$http', function($http) {
    return {
        get : function() {
            return $http.get('/api/people');
        },
        delete : function(id,config) {
            return $http.delete('/api/people/' + id,config);
        },
        create : function(personData) {
            return $http.post('/api/people', personData);
        }
    }
}]);

// контроллер модуля 'app.peopleList'
// ЗАМЕТКА: обратить внимание на имя контроллера: 'app.peopleList' => 'PeopleListController'
peopleModule.controller('PeopleListController', ['peopleService','$location','$mdDialog','$mdToast', PeopleListController]);

function PeopleListController(peopleService,$location,$mdDialog,$mdToast) {

    var peopleList = this;
    peopleList.tmpPerson={};
    peopleList.go = function ( id ) {
        console.log("go")
        $location.path( '/people/'+peopleList.list[id]._id );
    };
    peopleList.showAdd = function(ev) {
        $mdDialog.show({
                controller: DialogController,
                templateUrl: 'components/people-list/person-add-dialog.html',
                parent: angular.element(document.body),
                clickOutsideToClose:true,
                targetEvent: ev,
            })
            .then(function(answer) {

            }, function() {

            });
    };
    peopleList.deletePerson = function(id){
        peopleService.delete(peopleList.list[id]._id)
            .then(function(res){
                $mdToast.show(
                    $mdToast.simple().content('Deleted')
                );
                    peopleList.list.splice(id,1);
            },
            function(err){
                $mdToast.show(
                    $mdToast.simple().content('Deleted')
                );
            });
    }
    peopleService.get().then(function(result) {
        peopleList.list = result.data;

    });
}
function DialogController($scope, $mdDialog,peopleService,$mdToast) {
    $scope.person={};
    $scope.tmpDate= new Date();
    $scope.hide = function() {
        $mdDialog.hide();
    };
    $scope.cancel = function() {
        $mdDialog.cancel();
    };
    $scope.answer = function(answer) {
        console.log(answer)
        console.log($scope.person)
        if(answer==='useful'){
            $scope.person.birthDay={
                day: $scope.tmpDate.getUTCDate()+1,
                month : $scope.tmpDate.getMonth()+1,
                year : $scope.tmpDate.getFullYear()
            }
            $scope.person.birtday
            console.log($scope.person)
            peopleService.create($scope.person)
                .then(function(res){
                        $mdToast.show(
                            $mdToast.simple().content('Deleted')
                        );
                    },
                    function(err){
                        $mdToast.show(
                            $mdToast.simple().content('Deleted')
                        );
                    });
        }
        $mdDialog.hide(answer);
    };
};
