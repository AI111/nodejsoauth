/**
 * Created by sasha on 04.10.15.
 */


//var express = require('express');
//var controller = require('./index.controller')
//var router = express.Router();
//module.exports = function (app,passport) {
//
//    app.get('/', controller.index);
//
//    // send to google to do the authentication
//    app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));
//
//    // the callback after google has authenticated the user
//    app.get('/auth/google/callback',
//        passport.authenticate('google', {
//            successRedirect : '/profile',
//            failureRedirect : '/'
//        }));
//
//   // app.get('/test',controller.mainPage);
//
//    app.get('/profile', isLoggedIn, controller.profilegoogle);
//
//    app.get('/unlink/google', isLoggedIn, controller.unlinkgoogle);
//    app.get('/logout', controller.logOut);
//};
//function isLoggedIn(req, res, next) {
//    if (req.isAuthenticated())
//        return next();
//
//    res.redirect('/');
//}