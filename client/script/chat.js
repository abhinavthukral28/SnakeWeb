var socket = io.connect();
function appendMessage(message, username) {
    $("#chatBoard").append("<div class = \"chatMessage\"><p>" + username + ": " + message + "</p></div>");
}
function sendMessage() {
    console.log("Chat Sender Acdtivated");
    if ($('#chatInput').val() != "") 
    {
        socket.emit("message", $("#chatInput").val());
        appendMessage($("#chatInput").val(), "me", new Date().toISOString(), true);
        $('#chatInput').val("");
    }
    
}
function setUser() {
    if ($("#newUnserField").val() != "") {
        socket.emit('setUser', $("#newUserField").val());
}

}

socket.on("message", function(data) {
    appendMessage(data['message'], data['username']);
});