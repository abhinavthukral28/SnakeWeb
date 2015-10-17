var app = require('http').createServer(handler);
var fs = require('fs');
var path = require('path');

var clientHome = __dirname + "/client/"
var homePage = clientHome + "index.html";
var io = require('socket.io')(app);


app.listen(process.env.PORT, process.env.IP);


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

io.on('connection', function(socket) {
  socket.emit('news', {
    hello: 'world'
  });
  socket.on('my other event', function(data) {
    console.log(data);
  });
  socket.on('setUser', function(data) {
    socket.user = data;
  });
  socket.on('message', function(message) {
    socket.get('user', function(err, username) {
      
      var data = {
        'message': message,
        user: username
      };
      socket.broadcast.emit('message', data);
      console.log('user:' + username + 'message:' + message);
    });

  })
});
