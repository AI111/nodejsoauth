/**
 * Created by sasha on 05.11.15.
 */
var auth = require('../auth/auth.service');
var config = require("../config");
var Room = require("../api/room/room.model");
var Message = require("../api/message/message.model");
module.exports = function (socketio) {
     //socketio.use(require('socketio-jwt').authorize({
     //  secret: config.secrets.session,
     //  handshake: true
     //}));
  var rooms;
  Room.find(function (err, room) {
    if(err) { return }
    rooms=room;
    console.log(rooms);
    initSocketIO(socketio,rooms);
  });


  initSocketIO=function(socketio,rooms){

    socketio.on('connection', function (socket) {
      var roomId;
      var userId;
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
      socket.on('init',function(data){
        console.log("init ",data)
        if(rooms.filter(function(e){return e._id==data.room}).length>0){
          console.log("init ",data)
          roomId=data.room;
          userId=data.user;
          socket.join(data.room)

        }
      });
      socket.on('send',function(data){
        console.info('[%s] send ',data);

        socket.broadcast.to(roomId).emit('broadcast msg',data);
        var msgObj = new Message({text:data.text,sender:userId,sendTime:data.sendTime,room:roomId});
        msgObj.save(function(err){
          if(err) {
            socket.broadcast.to(roomId).emit('error',"can not save massage from user"+msgObj.sender);
          }
          console.log(JSON.stringify(msgObj));
        });
      });

      console.info('[%s] CONNECTED', socket.address);
    });
  }

}
