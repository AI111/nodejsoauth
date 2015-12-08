/**
 * Created by sasha on 04.10.15.
 */
var path = require('path');

var Person = require('../api/person/person');
exports.index = function(req, res) {
    res.render('index', {title : "Проверка"});
};
exports.profilegoogle = function(req, res){
    Person.find(function(err, people) {
        if (err) res.render('people');
        res.render('profile.ejs', {
            user: req.user,list : people
        });
    });

};
exports.unlinkgoogle=function(req, res) {
    var user          = req.user;
    user.google.token = undefined;
    user.save(function(err) {
        res.redirect('/profile');
    });
};
exports.logOut=function(req, res) {
    req.logout();
    res.redirect('/');
};
exports.mainPage = function(req, res) {
    res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
};

