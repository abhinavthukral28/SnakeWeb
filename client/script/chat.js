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
        console.log("here");
        var ownSnake = data.ownSnake;
         
        for (var i = 0; i < data.otherSnakes.length;i++)
        {
            var otherSnake = new Snake(data.otherSnakes[i].userName,data.otherSnakes[i].color,data.otherSnakes[i].x,data.otherSnakes[i].y);
            console.log(otherSnake);
            Game.snakes.push(otherSnake);
        }
        var snake = new Snake(user,ownSnake.color,ownSnake.x,ownSnake.y);
        Game.userSnake = snake;
        Game.snakes.push(snake);
        $("#gameConfig").show();
    
});

socket.on("newUser",function (data){
      var snake = new Snake(data.userName,data.color,data.x,data.y);
        Game.snakes.push(snake);
         
});

socket.on("message", function (data) {
    appendMessage(data.message, data.userName);
});

socket.on("score",function(data){
   food = data.newFood; 
});


socket.on("readyReceived",function(){
    console.log("ready");
   $("#gameConfig").remove();
});
function readyUp()
{
    socket.emit("ready");
}

socket.on("startGame",function()
{
    console.log("starting");
   startGame(); 
});


socket.on("userDisconnect",function(data){
    location.reload();
    // for (var i = 0; i < Game.snakes.length;i++ )
    // {
    //     if (Game.snakes[i].userName == data)
    //     {
    //         Game.snakes.splice(i,1);
    //         return;
    //     }
    // }
});

socket.on('turn',function(arg){
    console.log("OTHER TURN");
    console.log(arg.userName);
    if (arg.userName != Game.userSnake.userName)
    {
      for (var i = 0; i < Game.snakes.length;i++ )
    {
        if (Game.snakes[i].userName == arg.userName)
        {
            console.log("STARTING OTHER TURN");
            Game.snakes[i].startTurn(arg.turnData);
            return;
        }
    }
    }
});

$("document").on("unload",function()
{
 
    console.log("SENDING DISCONNECT");
   socket.emit("disconnect");
});