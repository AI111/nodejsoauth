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
        }
        //{
        //    _id:3,
        //    name: {
        //        firstName : "sdfsdf",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //},
        //{
        //    _id:4,
        //    name: {
        //        firstName : "sdfsf",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //},
        //{
        //    _id:5,
        //    name: {
        //        firstName : "sdfsf",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //}
        //{
        //    _id:6,
        //    name: {
        //        firstName : "sdfsdfsf",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //},
        //{
        //    _id:7,
        //    name: {
        //        firstName : "sdfvgdf",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //},
        //{
        //    _id:8,
        //    name: {
        //        firstName : "dfgsxc",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //},
        //{
        //    _id:9,
        //    name: {
        //        firstName : "thgfdh",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //},
        //{
        //    _id:10,
        //    name: {
        //        firstName : "ofgsrgdf",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //},
        //{
        //    _id:11,
        //    name: {
        //        firstName : "tfgsrgdf",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //},
        //{
        //    _id:12,
        //    name: {
        //        firstName : "qfgsrgdf",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //},
        //{
        //    _id:13,
        //    name: {
        //        firstName : "zfgsrgdf",
        //        lastName : "lastName",
        //        middleName: "middleName"
        //    },
        //    birthDay : {
        //        day: 1,
        //        month : 1,
        //        year : 1
        //    }
        //}
    );
});
