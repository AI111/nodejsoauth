/**
 * Created by sasha on 15.10.15.
 */
'use strict';
var port = 9000;
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
        clientID:     process.env.FACEBOOK_ID || '1640408799550875',
        clientSecret: process.env.FACEBOOK_SECRET || '18709684f89fa17e597e9e9324d45ab1',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/facebook/callback'
    },
    twitter: {
        clientID:     process.env.TWITTER_ID || 'rkgKRegJ9zaapxMo2QWib8yhT',
        clientSecret: process.env.TWITTER_SECRET || '9McrlEMK1O7yYsWt9sSk8zqszg6gD1YziD9rKencygTiY2358M',
        callbackURL:  (process.env.DOMAIN || '') + '/auth/twitter/callback'
    },
    secrets: {
        session: 'angular-full-stack-secret'
    },
    userRoles: ['guest', 'user', 'admin']

};
