// модуль для вывода списка людей
var peopleModule = angular.module('app.peopleList', []);

// фабрика (сервис) для получения информации с базы данных через API
peopleModule.factory('peopleService', ['$http', function($http) {
  return {
    get : function() {
      return $http.get('/api/people');
    },
    create : function(personData) {
      return $http.post('/api/people', personData);
    }
  }
}]);

// контроллер модуля 'app.peopleList'
// ЗАМЕТКА: обратить внимание на имя контроллера: 'app.peopleList' => 'PeopleListController'
peopleModule.controller('PeopleListController', ['peopleService','$location','$mdDialog', PeopleListController]);

function PeopleListController(peopleService,$location,$mdDialog,$scope) {

  var peopleList = this;
  peopleList.go = function ( id ) {
    console.log("go")
    $location.path( '/people/'+id );
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
          $scope.alert = 'You said the information was "' + answer + '".';
        }, function() {
          $scope.alert = 'You cancelled the dialog.';
        });
  };
  peopleService.get().then(function(result) {
    peopleList.list = result.data;

  });
}
function DialogController($scope, $mdDialog) {
    $scope.person={}

  $scope.hide = function() {
    $mdDialog.hide();
  };
  $scope.cancel = function() {
    $mdDialog.cancel();
  };
  $scope.answer = function(answer) {
      console.log(answer)
      console.log($scope.person)

      $mdDialog.hide(answer);
  };
};
