/**
 * Created by sasha on 04.10.15.
 */
var Person = require('../models/person');
exports.showPeople = function(req, res) {
    Person.find(function(err, people) {
        if (err) res.render('people');
        res.render('people', {title : "Вывод всего списка",
            list : people});
    });
};
exports.showPerson = function(req, res) {
    //if (err) throw err;
    res.render('people', {person : req.person,
        title : "Иинформация о человеке"});
};
exports.getById = function(req, res, next, id) {
    Person.findById(id, function(err, person) {
        if (err) return next(err);
        req.person = person;
        next();
    });
}