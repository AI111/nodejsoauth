/**
 * Created by sasha on 19.09.15.
 */
'use strict';

var Person = require('./../person/person');
var User = require('./../user/user.model.js');
var Room = require('./../room/room.model.js');
var Message = require('./../message/message.model.js');

var testUser1 = User({
    provider: 'local',
    name: 'Test User1',
    email: 'test1@test.com',
    password: 'test'});
var testUser2 = User({
    provider: 'local',
    name: 'Test User2',
    email: 'test2@test.com',
    password: 'test',
    contacts: [testUser1._id]});
var testUser3 = User({
    provider: 'local',
    name: 'Test User3',
    email: 'test3@test.com',
    password: 'test',
    contacts: [testUser1._id]});
var testUser4 = User({
    provider: 'local',
    name: 'Test User4',
    email: 'test4@test.com',
    password: 'test',
    contacts: [testUser1._id]});

testUser1.contacts=[testUser2._id, testUser3._id, testUser4._id];

User.find({}).remove(function() {
    User.create({
            provider: 'local',
            name: 'Test User',
            email: 'test@test.com',
            password: 'test',
            contacts: [testUser1._id,testUser2._id]
        },
        testUser1,
        testUser2,
        testUser3,
        testUser4,
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
    text:" world",
    sender:testUser2._id
});
var testMessaage3 = Message({
    text:" Lorem ipsum dolor sit amet, rebum euripidis disputationi mei at, mel an harum legere vocent, mea eu graeco menandri. Affert exerci eam et. Ei eros omnis nam, ubique numquam est ex. Has id primis nemore insolens.",
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
    Room.create(
        {
            name:"test room1",
            creator:testUser1._id,
            users:[testUser1._id,testUser2._id],
            messages:[testMessaage1._id,testMessaage2._id]
        },        {
            name:"test room2",
            creator:testUser1._id,
            users:[testUser1._id,testUser2._id],
            messages:[testMessaage1._id,testMessaage2._id]
        },        {
            name:"test room3",
            creator:testUser2._id,
            users:[testUser1._id,testUser2._id],
            messages:[testMessaage1._id,testMessaage2._id]
        },{
            name:"test room4",
            creator:testUser1._id,
            users:[testUser2._id],
            messages:[testMessaage2._id]
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

