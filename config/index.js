/**
 * Created by sasha on 15.10.15.
 */
'use strict';


module.exports = {

    ip:       process.env.OPENSHIFT_NODEJS_IP ||
    process.env.IP ||
    undefined,

    port:     process.env.OPENSHIFT_NODEJS_PORT ||
    process.env.PORT ||
    8080,



    // MongoDB connection options
    mongo: {
        connection_string:process.env.OPENSHIFT_MONGODB_DB_URL||'127.0.0.1:27017/nodejsoauth'

    }
};