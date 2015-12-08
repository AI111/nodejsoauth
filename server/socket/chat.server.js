/**
 * Created by sasha on 09.11.15.
 */
var rooms=[];
var userId=0;

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
        socket.on('create room',function(data){

        });
        socket.on('send',function(data){
            console.info('[%s] send ',data);
            socket.broadcast.emit('broadcast msg',data);
        });
        console.info('[%s] CONNECTED', socket.address);
    });
}
function joinRoom(socket, room) {
// Вход пользователя в комнату чата
    socket.join(room);
// Обнаружение пользователя в данной комнате
    rooms[socket.id] = room;
// Оповещение пользователя о том, что он находится в новой комнате
    socket.emit('joinResult', {room: room});
// Оповещение других пользователей о появлении нового
// пользователя в комнате чата
    socket.broadcast.to(room).emit('message', {
        text: nickNames[socket.id] + ' has joined ' + room + '.'
    });
// Идентификация других пользователей, находящихся в той же
// комнате, что и пользователь
    var usersInRoom = io.sockets.clients(room);
// Если другие пользователи присутствуют в данной
// комнате чата, просуммировать их
    if (usersInRoom.length > 1) {
        var usersInRoomSummary = 'Users currently in ' + room + ': ';
        for (var index in usersInRoom) {
            var userSocketId = usersInRoom[index].id;
            if (userSocketId != socket.id) {
                if (index > 0) {
                    usersInRoomSummary += ', ';
                }
                usersInRoomSummary += nickNames[userSocketId];
            }
        }
        usersInRoomSummary += '.';
// Вывод отчета о других пользователях, находящихся в комнате
        socket.emit('message', {text: usersInRoomSummary});}
}