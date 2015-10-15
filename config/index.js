/**
 * Created by sasha on 15.10.15.
 */
'use strict';

var connection_string = '127.0.0.1:27017/nodejsoauth';
// if OPENSHIFT env variables are present, use the available connection info:
if(process.env.OPENSHIFT_MONGODB_DB_PASSWORD){
    connection_string = process.env.OPENSHIFT_MONGODB_DB_USERNAME + ":" +
        process.env.OPENSHIFT_MONGODB_DB_PASSWORD + "@" +
        process.env.OPENSHIFT_MONGODB_DB_HOST + ':' +
        process.env.OPENSHIFT_MONGODB_DB_PORT + '/' +
        process.env.OPENSHIFT_APP_NAME;
}
module.exports = {
    // MongoDB connection options
    ip:       process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

    // Server port
    port:     process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,



    // MongoDB connection options
    mongo: {
        connection_string:connection_string,
        uri:    (process.env.OPENSHIFT_MONGODB_DB_HOST || 'mongodb://localhost')+"/nodejsoauth",
        options: {
        user: process.env.OPENSHIFT_MONGODB_DB_USERNAME||undefined,
        pass: process.env.OPENSHIFT_MONGODB_DB_PASSWORD||undefined
    }
    }
};