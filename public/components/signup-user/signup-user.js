'use strict';

var signUpModel = angular.module('app.signupUser',['app.authService']);

signUpModel.controller('SignupUserController',['$window','$location','Auth',SignupUserController]);
function SignupUserController($location,Auth,$window){
    var signupUser =this;
    signupUser.user = {};
    signupUser.errors = {};

    signupUser.register = function(form) {
        console.log('register')
        console.log(signupUser.user)

        signupUser.submitted = true;

        if(form.$valid) {

            Auth.createUser({
                    name: signupUser.user.name,
                    email: signupUser.user.email,
                    password: signupUser.user.password
                })
                .then( function() {
                    // Account created, redirect to home
                    $location.path('/');
                })
                .catch( function(err) {
                    err = err.data;
                    signupUser.errors = {};

                    // Update validity of form fields that match the mongoose errors
                    angular.forEach(err.errors, function(error, field) {
                        form[field].$setValidity('mongoose', false);
                        signupUser.errors[field] = error.message;
                    });
                });
        }
    };

    signupUser.loginOauth = function(provider) {
        $window.location.href = '/auth/' + provider;
    };
}