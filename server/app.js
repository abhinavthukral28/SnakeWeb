var app = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');

var clientHome = "../client/";
var homePage = clientHome + "index.html";
var io = require("socket.io")(app)
var game = require("./game.js")(io);
app.listen('3000','127.0.0.1' );


function handler(req, res) {
    var pathSplit = req.url.split(path.sep);
    stdOut(pathSplit);
    if (pathSplit.length == 2) {
        if (path[2] != "favicon.ico") {
            fs.readFile(homePage,
                function(err, data) {
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
        var data = getStaticResource(pathSplit, function(data) {
            if (data == undefined) {

                fs.readFile(homePage,
                    function(err, data) {
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
    return fs.readFile(clientHome + split[2] + path.sep + split[3], function(err, data) {
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
