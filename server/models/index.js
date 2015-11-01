/**
 * Created by sasha on 20.09.15.
 */
'use strict'
var express = require('express');
var controller = require('././person.controller.js');
var router = express.Router();

router.get('/',controller.getAll);
router.get('/:id',controller.getById);
router.post('/',controller.create);
router.put('/:id',controller.update);
router.delete('/',controller.destroy);
module.exports = router;