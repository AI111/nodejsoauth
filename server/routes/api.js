/**
 * Created by sasha on 04.10.15.
 */
'use strict'
var express = require('express');
var controller = require('../controllers/person.controller');
var router = express.Router();

router.get('/',controller.getAll);
router.get('/:id',controller.getById);
router.post('/',controller.create);
router.put('/:id',controller.update);
router.delete('/:id',controller.destroy);
module.exports = router;