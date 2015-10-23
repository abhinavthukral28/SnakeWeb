var User = require("./user.js");

var game = function(io) {
    //The array of users in the game
    var users = []; 
    //available snake colors   
    var colors = ["red", "blue", "green", "orange"]; 
    //players ready in the lobby
    var ready = 0; 

    //start points for different snakes
    var startPoints = [ 
        [20, 50],
        [50, 50],
        [80, 50],
        [110, 50]
    ]; 
    //socket events
    io.on('connection', function(socket) {
        //new user event
        socket.on('setUser', function(userName) {
            if (users.length >= 4) {
                socket.emit('no more room', "No more Room on the Server");
            }
            else {
                socket.user = new User(userName, colors[users.length], startPoints[users.length], users.length);
                var snakeList = [];
                for (var i in users) {
                    snakeList.push(users[i].snake);
                }
                users.push(socket.user);
                socket.emit('registeredUser', {
                    ownSnake: socket.user.snake,
                    otherSnakes: snakeList
                });
                socket.broadcast.emit('newUser', socket.user.snake);
            }

        });
       //Players ready for game event 
        socket.on('ready', function(){
            ready = ready + 1;
            socket.emit('readyReceived');
            if(ready === users.length){
                io.emit('startGame');
                ready = 0;
            }
            else if (ready >= 2 && ready < users.length){
                setTimeout(function () {
                    io.emit('startGame');
                    ready = 0;
                }, 20000);
            }
            else{
                io.emit('startGame');
            }
        });
        //Chat message Event
        socket.on('message', function(data) {
            socket.broadcast.emit('message', data);
        });
        
        //Player Score Event, adds the players scores and transmits the coordinates of the new food
        socket.on('newScore', function(data) {
            if (socket.hasOwnProperty('user')) {
                socket.user.incrementScore();
                //if user won the game
                if(socket.user.getScore() >= 20) {
                    io.emit('winner', socket.user.userName);
                    users = [];
                }
                else{
                    io.emit('score', {
                        userName: socket.user.userName,
                        score: socket.user.getScore(),
                        newFood: data
                    });
                }
            }
        });
        socket.on('newTurn', function(data) {
            socket.broadcast.emit('turn', {
                userName: socket.user.userName,
                turnData: data
            });
        });
        //event on user disconnect
        socket.on('disconnect', function() {
            if (socket.hasOwnProperty('user')) {
                console.log('disconnect');
                // for (var i = 0; i < users.length; i++) {
                //     if(users[i].userName === socket.user.userName){
                //         users.splice(i, 1);
                //         break;
                //     }
                users = [];
                socket.broadcast.emit('userDisconnect', socket.user.userName);
            }
        });
    });

};
module.exports = game;