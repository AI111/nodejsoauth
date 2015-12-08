/**
 * Created by sasha on 04.12.15.
 */
'use strict';
var mongoose = require('mongoose');
var Person = require('./server/api/person/person');
var User = require('./server/api/user/user.model.js');
var Room = require('./server/api/room/room.model.js');
var Message = require('./server/api/message/message.model.js');
var config = require('./server/config');

mongoose.connect(config.mongo.connection_string);
mongoose.connection.on('error', function(err) {
        console.error('MongoDB connection error: ' + err);
        process.exit(-1);
    }
);
var testUser1 = User({
    provider: 'local',
    name: 'Test User1',
    email: 'test1@test.com',
    password: 'test'});
var testUser2 = User({
    provider: 'local',
    name: 'Test User2',
    email: 'test2@test.com',
    password: 'test'});
console.log(testUser1._id);
console.log(testUser2._id);
User.find({}).remove(function() {
    User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@test.com',
            password: 'test'
        },
        testUser1,
        testUser2,
        {
            provider: 'local',
            role: 'admin',
            name: 'Admin',
            email: 'admin@admin.com',
            password: 'admin'
        }, function() {
            console.log('finished populating users');
        }
    );
});
var testMessaage1 = Message({
    text:" hello",
    sender:testUser1._id
})
var testMessaage2 = Message({
    text:" wprld",
    sender:testUser2._id
})
Message.find({}).remove(function(){
    Message.create(
        testMessaage1,
        testMessaage2, function() {
            console.log('finished populating message');
        }
    );
});
Room.find({}).remove(function(){
    Room.create({
        name:"test room",
        creator:testUser1._id,
        users:[testUser1._id,testUser2._id],
        messages:[testMessaage1._id,testMessaage2._id]
    }, function() {
        console.log('finished populating rooms');
    });
});

console.log("finish");

Person.find({}).remove(function() {
    Person.create(
        {
            //_id:0,
            name: {
                firstName : "Sasha",
                lastName : "Andreev",
                middleName: "Petrivich"
            },
            birthDay : {
                day: 7,
                month : 4,
                year : 1993
            }
        },
        {
            //_id:1,
            name: {
                firstName : "ZfirstName",
                lastName : "lastName",
                middleName: "middleName"
            },
            birthDay : {
                day: 1,
                month : 5,
                year : 1993
            }
        },
        {
            //_id:2,
            name: {
                firstName : "AfirstName",
                lastName : "lastName",
                middleName: "middleName"
            },
            birthDay : {
                day: 1,
                month : 1,
                year : 1993
            }
        },
        {
            //_id:7,
            name: {
                firstName : "sdfsdf",
                lastName : "lastName",
                middleName: "middleName"
            },
            birthDay : {
                day: 1,
                month : 1,
                year : 1992
            }
        },
        {
            //_id:4,
            name: {
                firstName : "sdfsf",
                lastName : "lastName",
                middleName: "middleName"
            },
            birthDay : {
                day: 1,
                month : 1,
                year : 1994
            }
        }

    );
});
