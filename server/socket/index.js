/**
 * Created by sasha on 05.11.15.
 */
module.exports = function (socketio) {
  socketio.on('connection', function (socket) {
    socket.address = socket.handshake.address !== null ?
    socket.handshake.address.address + ':' + socket.handshake.address.port :
        process.env.DOMAIN;

    socket.connectedAt = new Date();
    // Call onDisconnect.
    socket.on('disconnect', function () {
      console.info('[%s] DISCONNECTED', socket.address);
    });

    socket.on('send',function(data){
      console.info('[%s] send ',data);
      socket.broadcast.emit('broadcast msg',data);
    });
    console.info('[%s] CONNECTED', socket.address);
  });
}
