var chat = require("./ChatServer.js");
var User = require("./user.js");

var game = function(io) {
    var users = [];
    var colors = ["red", "blue", "green", "orange"];
    var winner;

    var startPoints = [
        [20, 50],
        [50, 50],
        [80, 50],
        [110, 50]
    ];
    io.on('connection', function(socket) {
        socket.on('setUser', function(userName) {
            if (users.length >= 4) {
                socket.emit('no more room', "No more Room on the Server");
            }
            else {
                socket.user = new User(userName, colors[users.length], startPoints[users.length], users.length);
                users.push(socket.user);
                var snakeList = [];
                for (i in users) {
                    snakeList.push(users[i].snake);
                }
                socket.emit('registeredUser', {
                    ownSnake: socket.user.snake,
                    otherSnakes: snakeList
                });
                socket.broadcast.emit('newUser', socket.user.snake);
            }

        });
        socket.on('message', function(data) {
            socket.broadcast.emit('message', data);
        });
        socket.on('score', function(userName) {
            if (socket.hasOwnProperty('user')) {
                socket.user.incrementScore();
            }
        });
        socket.on('food', function(userName) {
            if (socket.hasOwnProperty('user')) {
                socket.user.incrementScore();
                if(socket.user.getScore() >= 20) {
                    socket.broadcast.emit('winner', userName)
                }
            }
        });
        
        socket.on('disconnect', function(userName) {
            if (socket.hasOwnProperty('user')) {
                users.splice(socket.user.index, 1);
            }
        });
    });

}
module.exports = game;