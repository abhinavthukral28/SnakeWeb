var socket = io.connect();
var user = "";
function appendMessage(message, username) {
    $("#chatBoard").append("<div class = \"chatMessage\"><p>" + username + ": " + message + "</p></div>");
}
function sendMessage() {
    console.log("Chat Sender Acdtivated");
    if ($('#chatInput').val() != "") 
    {
        var data = {
            userName: user,
            message: $("#chatInput").val()
        };
        socket.emit("message", data);
        appendMessage(data.message, "Me");

    }
    
}
function setUser() {
    if ($("#newUnserField").val() != "") {
        user = $("#newUserField").val();
        socket.emit('setUser', user);
}

}

socket.on("message", function(data) {
    appendMessage(data.userName, data.message);
});