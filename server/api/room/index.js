'use strict';

var express = require('express');
var controller = require('./room.controller');
var config = require('../../config/index');
var auth = require('../../auth/auth.service.js');

var router = express.Router();

router.get('/',auth.isAuthenticated(),controller.getMy);
router.get('/:id/messages',auth.isAuthenticated(),controller.getRoomAllMsg);
router.get('/:id/users',auth.isAuthenticated(),controller.getRoomAllUsers);
router.get('/:id',auth.isAuthenticated(),controller.getById);
router.post('/',auth.isAuthenticated(),controller.create);
router.put('/:id',auth.isAuthenticated(),controller.update);
router.delete('/:id',auth.isAuthenticated(),controller.destroy);
module.exports = router;

module.exports = router;
