var io = require("socket.io");
var chatServer = function(app) {
    io = io(app);
    io.on('connection', function(socket) {
        socket.on('message', function(data) {

            socket.broadcast.emit('message', data);

        });
    });
}
module.exports = chatServer