var personModule = angular.module('app.personDetailed', []);

personModule.factory('personService', ['$http', function($http) {
  return {
    get : function(id) {
      return $http.get('/api/people/' + id);
    },    
    delete : function(id) {
      return $http.delete('/api/people/' + id);
    }    
  }  
}]);

personModule.controller('PersonDetailedController', ['$routeParams', 'personService', PersonDetailedController]);

function PersonDetailedController($routeParams, personService) {
      
   var personDetailed = this,
        id = $routeParams.id;
          
  personDetailed.id = id;
  
  personService.get(id).then(function(res) {   
    personDetailed.item = res.data;
    personDetailed.birtday= new Date(res.data.birthDay.year,res.data.birthDay.month,res.data.birthDay.day);
  });
}