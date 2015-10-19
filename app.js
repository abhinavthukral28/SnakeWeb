var app = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');

var clientHome = __dirname + "/client/"
var homePage = clientHome + "index.html";
var chat = require('./ChatServer.js')(app);
app.listen(process.env.PORT, process.env.IP);

var users = {};

function handler(req, res) {
    var pathSplit = req.url.split(path.sep);
    stdOut(pathSplit);
    if (pathSplit.length == 2) {
        if (path[2] != "favicon.ico") {
            fs.readFile(homePage,
                function (err, data) {
                    if (err) {
                        res.writeHead(500);
                        return res.end('Error loading index.html');
                    }

                    res.writeHead(200);
                    res.end(data);
                });
        }
        else {
            res.end("");
        }

    }

    if (isStaticResource(pathSplit)) {
        var data = getStaticResource(pathSplit, function (data) {
            if (data == undefined) {

                fs.readFile(homePage,
                    function (err, data) {
                        if (err) {
                            res.writeHead(500);
                            return res.end('Error loading index.html');
                        }

                        res.writeHead(200);
                        res.end(data);
                    });

            }
            else {

                res.writeHead(200);
                res.end(data);
            }
        });


    }
}


function getStaticResource(split, callback) {
    return fs.readFile(clientHome + split[2] + path.sep + split[3], function (err, data) {
        if (err) {

            callback(undefined);
        }

        callback(data);
    });
}

function isStaticResource(splitPath) {

    return (splitPath[1] == "client");

}


function stdOut(out) {
    console.log(out);
}

/*io.on('connection', function (socket) {
    socket.on('setUser', function (user) {
        socket.user = user;
    });
    socket.on('message', function (data) {

        socket.broadcast.emit('message', data);

    });*/
// });
