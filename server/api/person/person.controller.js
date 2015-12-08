/**
 * Created by sasha on 18.09.15.
 */

'use strict';

var _ = require('lodash');
var Person = require('./person');

// Get list of things
exports.getAll = function(req, res) {
    Person.find(function (err, things) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(things);
    });
};

// Get a single thing
exports.getById = function(req, res) {
    Person.findById(req.params.id, function (err, thing) {
        if(err) { return handleError(res, err); }
        if(!thing) { return res.status(404).send('Not Found'); }
        return res.json(thing);
    });
};


// Creates a new thing in the DB.
exports.create = function(req, res) {
    console.log("CREATE");

    console.log(req.body);


    Person.create(req.body, function(err, thing) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(thing);
    });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Person.findById(req.params.id, function (err, thing) {
        if (err) { return handleError(res, err); }
        if(!thing) { return res.status(404).send('Not Found'); }
        var updated = _.merge(thing, req.body);
        updated.save(function (err) {
            if (err) { return handleError(res, err); }
            return res.status(200).json(thing);
        });
    });
};

// Deletes a thing from the DB.
exports.destroy = function(req, res) {
    Person.findById(req.params.id, function (err, thing) {
        if(err) { return handleError(res, err); }
        if(!thing) { return res.status(404).send('Not Found'); }
        thing.remove(function(err) {
            if(err) { return handleError(res, err); }
            return res.status(204).send('No Content');
        });
    });
};

function handleError(res, err) {
    return res.status(500).send(err);
}