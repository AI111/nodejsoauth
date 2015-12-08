/**
 * Created by sasha on 05.11.15.
 */
var auth = require('../auth/auth.service');
var config = require("../config")
module.exports = function (socketio) {
     socketio.use(require('socketio-jwt').authorize({
       secret: config.secrets.session,
       handshake: true
     }));
  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
    socket.handshake.address.address + ':' + socket.handshake.address.port :
        process.env.DOMAIN;
      console.log("connected");

    socket.connectedAt = new Date();
    // Call onDisconnect.
    socket.on('disconnect', function () {
      console.info('[%s] DISCONNECTED', socket.address);
    });
    socket.on('create room',function(data){

    });
    socket.on('send',function(data){
      console.info('[%s] send ',data.text);
      socket.broadcast.emit('broadcast msg',data);
    });
    console.info('[%s] CONNECTED', socket.address);
  });
}
