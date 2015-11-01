/**
 * Created by sasha on 15.10.15.
 */
'use strict';
var port = 8080;
var domain='';
if(process.env.OPENSHIFT_APP_DNS){
    domain='https://'+process.env.OPENSHIFT_APP_DNS;
}else{
    domain='http://localhost:'+port
}

module.exports = {

    ip:       process.env.OPENSHIFT_NODEJS_IP || process.env.IP || undefined,

    port:     process.env.OPENSHIFT_NODEJS_PORT || process.env.PORT || port,


    mongo: {
        connection_string:'mongodb://'+(process.env.OPENSHIFT_MONGODB_DB_URL||'127.0.0.1:27017/nodejsoauth')
    },
    google: {
        clientID:     process.env.GOOGLE_ID || '706386627126-0uv3el1d2tn35hn5hfmakedvacog10e6.apps.googleusercontent.com',
        clientSecret: process.env.GOOGLE_SECRET || 'Qoa-LozhWnOpQmTPXwFEEc2f',
        callbackURL:  domain+ '/auth/google/callback'
    },
    facebook: {
        clientID:     process.env.FACEBOOK_ID || 'id',
        clientSecret: process.env.FACEBOOK_SECRET || 'secret',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },
    twitter: {
        clientID:     process.env.TWITTER_ID || 'id',
        clientSecret: process.env.TWITTER_SECRET || 'secret',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },
    secrets: {
        session: 'angular-full-stack-secret'
    },
    userRoles: ['guest', 'user', 'admin']

};
