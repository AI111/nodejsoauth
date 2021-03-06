/**
 * Created by sasha on 03.11.15.
 */
var appModule = angular.module('app.userProfile', [ 'ngMaterial']);
appModule.controller('LeftBarController', function ($scope, $mdSidenav, $log,$location,Auth) {
    $scope.isCollapsed = true;
    $scope.isLoggedIn = Auth.isLoggedIn;
    $scope.isAdmin = Auth.isAdmin;
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.logout = function() {
        Auth.logout();
        $location.path('/login');
    };

    $scope.isActive = function(route) {
        return route === $location.path();
    };
    $scope.toggleNavBar = function(){
        $mdSidenav('left').toggle();
    }
    $scope.menu=[
        {
            link : '/',
            title: 'Main',
            icon: '/img/icons/ic_home_24px.svg'
        },
        {
            link : '/people',
            title: 'Contacts',
            icon: '/img/icons/ic_group_24px.svg'
        },
        {
            link : '/rooms',
            title: 'Chat',
            icon: '/img/icons/ic_chat_24px.svg'
        }

    ];
    $scope.close = function () {
        $mdSidenav('left').close()
            .then(function () {
                $log.debug("close LEFT is done");
            });
    };
}).directive('userProfile',function(){
    return {
        restrict: 'E',
        templateUrl: 'components/user-profile/user-profile.html'
    };
}).directive('navMenu',function(){
    return {
        restrict: 'E',
        templateUrl: 'components/user-profile/nav-menu.html'
    };
});