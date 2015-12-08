/**
 * Main application routes
 */

'use strict';

var errors = require('./server/components/errors');
var path = require('path');

module.exports = function(app) {

  // Insert routes below
  app.use('/api/people', require('./server/api/person'));
  app.use('/api/users', require('./server/api/user'));
  //app.use('/api/message', require('./server/api/message'));
  app.use('/api/rooms', require('./server/api/room'));
  //app.use('/api/message', require('./server/api/'));

  app.use('/auth', require('./server/auth'));
  
  // All undefined asset or api routes should return a 404
  app.route('/:url(api|auth|components|app|bower_components|assets)/*')
   .get(errors[404]);

  // All other routes should redirect to the index.html
  app.route('/*')
    .get(function(req, res) {
      res.sendFile(path.resolve(app.get('appPath') + '/index.html'));
    });
};
