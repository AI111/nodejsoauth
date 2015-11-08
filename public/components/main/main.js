
var mainModule = angular.module('app.main', []);

mainModule.controller('MainController', [ MainController]);

function MainController() {
        var main =this;
        main.myVar = 'This is an SPA, running on Angular 1.4.9!';
}

