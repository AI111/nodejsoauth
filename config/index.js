/**
 * Created by sasha on 15.10.15.
 */
'use strict';


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
        uri:    process.env.OPENSHIFT_MONGODB_DB_HOST || 'mongodb://localhost/nodejs-lab2'
    }
};