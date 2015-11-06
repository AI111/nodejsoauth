'use strict';

// создаём модуль для главного приложения Angular
// приложение называется 'app', далее идет список всех под-модулей приложения:
// 'app.main' - основной модуль, который будет загружаться по-умолчанию по-маршруту '/'
// 'app.peopleList' - модуль, выводящий список всех записей из базы данных по маршруту '/people'
// 'app.personDetailed' - модуль, выводящий информацию о конкретной записи в БД по маршруту '/people/:id'
// также далее идет список зависимостей:
// 'ngNewRouter' - модуль маршрутизации Angular
// 'ngResource' - модуль для работы с 'RESTful' источниками
var appModule = angular.module('app', [
    'app.main',
    'app.chat',
    'app.peopleList',
    'app.personDetailed',
    'app.loginUser',
    'app.signupUser',
    'app.authService',


    'ngNewRouter',
    'ngResource',
    'ngMaterial',
    'ngCookies',
    'ngSanitize',
    'ngMdIcons',
    'app.userProfile']);

// основной контроллер приложения 'app'
appModule.controller('AppController', ['$router', AppController]);

function AppController($router) {
    // конфигурация маршрутов
    $router.config([
        { path: '/',            component: 'main'},
        { path: '/people',      component: 'peopleList'},
        { path: '/people/:id',  component: 'personDetailed'},
        { path: '/login',       component: 'loginUser' },
        { path: '/signup',      component: 'signupUser'},
        { path : '/chat',       component: 'chat'}
    ]);
}

appModule.directive('mongooseError', function () {
    return {
        restrict: 'A',
        require: 'ngModel',
        link: function(scope, element, attrs, ngModel) {
            element.on('keydown', function() {
                return ngModel.$setValidity('mongoose', true);
            });
        }
    };
});

