
var loginModel = angular.module('app.loginUser',['app.authService']);

loginModel.controller('LoginUserController', ['Auth', '$location', '$window', LoginUserController]);
function LoginUserController ( Auth, $location, $window) {
    var loginUser = this;
    loginUser.user = {};
    loginUser.errors = {};

    loginUser.login = function(form) {
        loginUser.submitted = true;

        if(form.$valid) {
            Auth.login({
                    email: loginUser.user.email,
                    password: loginUser.user.password
                })
                .then( function() {
                    // Logged in, redirect to home
                    $location.path('/');
                })
                .catch( function(err) {
                    loginUser.errors.other = err.message;
                });
        }
    };

    loginUser.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
}
