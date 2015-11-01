// основной модуль приложения
angular.module('app.main', []).
    controller('MainController', MainController);

// контроллер модуля 'app.main'
function MainController() { 
  this.myVar = 'This is an SPA, running on Angular 1.4.9!'; 
}