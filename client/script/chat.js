var socket = io.connect();
var user = "";
function appendMessage(message, username) {
    $("#chatBoard").append("<div class = \"chatMessage\"><p>" + username + ": " + message + "</p></div>");
}
function sendMessage() {
    if ($('#chatInput').val() != "") {
        var data = {
            userName: user,
            message: $("#chatInput").val()
        };
        socket.emit("message", data);
        appendMessage(data.message, "Me");
        $('#chatInput').val("");

    }

}
function setUser() {
    if ($("#newUnserField").val() != "") {
        user = $("#newUserField").val();
        socket.emit('setUser', user);
        $('#enterName').hide();
        $('#messageBoardSection').show();
        $('#messageSendSection').show();
        $('#gameCanvas').show();
        
        
    }

}

socket.on("registeredUser",function(data){
        var snake = new Snake(data.username,data.color,data.x,data.y);
        Game.snakes.push(snake);
        Game.userSnake = snake;
    
});

socket.on("newUser",function (data){
      var snake = new Snake(data.username,data.color,data.x,data.y);
        Game.snakes.push(snake);
         
});

socket.on("message", function (data) {
    appendMessage(data.message, data.userName);
});

