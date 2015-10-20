var chatServer = function(socket) {
        socket.on('message', function(data) {

            socket.broadcast.emit('message', data);

        });
}
module.exports = chatServer