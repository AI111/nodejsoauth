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
    'app.userProfile',
    'app.roomsList',


    'ngNewRouter',
    'ngResource',
    'ngMaterial',
    'ngCookies',
    'ngSanitize',
    'ngMdIcons']);

appModule.factory('authInterceptor', function ($rootScope, $q, $cookieStore, $location) {
        return {
            // Add authorization token to headers
            request: function (config) {
                config.headers = config.headers || {};
                if ($cookieStore.get('token')) {
                    config.headers.Authorization = 'Bearer ' + $cookieStore.get('token');
                }
                return config;
            },

            // Intercept 401s and redirect you to login
            responseError: function(response) {
                if(response.status === 401) {
                    $location.path('/login');
                    // remove any stale tokens
                    $cookieStore.remove('token');
                    return $q.reject(response);
                }
                else {
                    return $q.reject(response);
                }
            }
        };
    })

    .run(function ($rootScope, $location, Auth) {
        // Redirect to login if route requires auth and you're not logged in
        $rootScope.$on('$stateChangeStart', function (event, next) {
            Auth.isLoggedInAsync(function(loggedIn) {
                if (next.authenticate && !loggedIn) {
                    event.preventDefault();
                    $location.path('/login');
                }
            });
        });
    });

appModule.config(['$httpProvider', function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
}]);

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
        { path: '/rooms',       component: 'roomsList'},
        { path: '/chat/:id',    component: 'chat'}
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

