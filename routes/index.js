/**
 * Created by sasha on 04.10.15.
 */
var express = require('express');
var controller = require('../controllers/index.controller')
var router = express.Router();
module.exports = function (app) {
    app.get('/', controller.index);
};