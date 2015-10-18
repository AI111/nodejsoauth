/**
 * Created by sasha on 19.09.15.
 */
'use strict';

var Person = require('./person.js');

Person.find({}).remove(function() {
    Person.create(
        {
            _id:0,
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
            _id:1,
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
            _id:2,
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
            _id:3,
            name: {
                firstName : "sdfsdf",
                lastName : "lastName",
                middleName: "middleName"
            },
            birthDay : {
                day: 1,
                month : 1,
                year : 1
            }
        },
        {
            _id:4,
            name: {
                firstName : "sdfsf",
                lastName : "lastName",
                middleName: "middleName"
            },
            birthDay : {
                day: 1,
                month : 1,
                year : 1
            }
        }

    );
});
