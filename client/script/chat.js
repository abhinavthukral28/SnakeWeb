var socket = io.connect();
function appendMessage(message, username) {
    $("chatBoard").append("<div class = \"chatMessage\"><p>" + username + ":" + message + "</p></div>");
}
function sendMessage(ar) {
    // body...
}