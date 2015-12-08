/**
 * Created by sasha on 18.09.15.
 */

'use strict';

var _ = require('lodash');
var Room = require('./room.model.js');
var Message = require('../message/message.model');

// Get list of things
exports.getAll = function(req, res) {
    Room.find(function (err, things) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(things);
    });
};
exports.getMy = function(req, res) {
    Room.find({ users: { "$in" : [req.user._id]} },'-messages').populate('creator','name -_id').populate({path:'users',select:'name imgUrl -_id'}).exec(function (err, things) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(things);
    });
};
exports.getRoomAllMsg = function(req, res) {
    Room.findById( req.params.id,'messages -_id').populate('messages').exec(function (err, mess) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(mess.messages);
    });
};
exports.getRoomAllUsers = function(req, res) {
    Room.findById( req.params.id,'users -_id').populate('users','name email imgUrl').exec(function (err, users) {
        if(err) { return handleError(res, err); }
        return res.status(200).json(users.users);
    });
};
// Get a single thing
exports.getById = function(req, res) {
    Room.findById(req.params.id, function (err, thing) {
        if(err) { return handleError(res, err); }
        if(!thing) { return res.status(404).send('Not Found'); }
        return res.json(thing);
    });
};


// Creates a new thing in the DB.
exports.create = function(req, res) {
    console.log("CREATE");

    console.log(req.body);


    Room.create(req.body, function(err, thing) {
        if(err) { return handleError(res, err); }
        return res.status(201).json(thing);
    });
};

// Updates an existing thing in the DB.
exports.update = function(req, res) {
    if(req.body._id) { delete req.body._id; }
    Room.findById(req.params.id, function (err, thing) {
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
    Room.findById(req.params.id, function (err, thing) {
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