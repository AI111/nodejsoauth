var personModule = angular.module('app.personDetailed', []);

personModule.factory('personService', ['$http', function($http) {
  return {
    get : function(id) {
      return $http.get('/api/people/' + id);
    },
    put : function(id,person,config){
      return $http.put('/api/people/' + id,person,config)
    }
  }  
}]);

personModule.controller('PersonDetailedController', ['$routeParams', 'personService','$mdToast', PersonDetailedController]);

function PersonDetailedController($routeParams, personService,$mdToast) {
      
   var personDetailed = this,
        id = $routeParams.id;
  personDetailed.person={};
  personDetailed.id = id;
  
  personService.get(id).then(function(res) {
    personDetailed.person = res.data;
    personDetailed.birtday= new Date(res.data.birthDay.year,res.data.birthDay.month,res.data.birthDay.day);
  });
  personDetailed.updatePerson = function(){
    console.log("updatePerson");
    console.log(personDetailed.person);
    personService.put(id,personDetailed.person).then(function(res){
          $mdToast.show(
              $mdToast.simple().content('Person updated')
          );
    },
    function(err){
      console.log(err);
      $mdToast.show(
          $mdToast.simple().content('Error')
      );
    });
  }
}