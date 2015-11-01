/**
 * Created by sasha on 04.10.15.
 */
var ctrl = require('./people.controller');

var express = require('express');
var router = express.Router();
module.exports = function (app) {

    app.get('/people', ctrl.showPeople);
    app.get('/people/:id', ctrl.showPerson);
    app.param('id', ctrl.getById);
}