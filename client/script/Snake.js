 var Snake = function(username,color,x,y) {
  var thisObj = this;
  this.userName = username;
  var DIRECTION = Snake.directions.DOWN;
  var color = color;
  var length;
  var nodes = [];
  this.getNodes = function() {
   return nodes;
  }

  this.addNode = function() {
   var lastNode = nodes[nodes.length - 1];
   var newNode = new Node(0, 0, lastNode.direction);
   newNode.pivots = lastNode.pivots.slice();
   
   switch (lastNode.direction) {
    case Snake.directions.DOWN:
     newNode.x = lastNode.x;
     newNode.y = lastNode.y - Node.radius;
     break;
    case Snake.directions.LEFT:
     newNode.x = lastNode.x + Node.radius;
     newNode.y = lastNode.y;
     break;
    case Snake.directions.RIGHT:
     newNode.x = lastNode.x - Node.radius;
     newNode.y = lastNode.y;
     break;
    case Snake.directions.UP:
     newNode.x = lastNode.x;
     newNode.y = lastNode.y + Node.radius;
     break;
    default:
     break;


   }
   nodes.push(newNode);
  }


  this.getDirection = function() {
   return DIRECTION;
  }

  this.getColor = function() {
   return color;
  }

  this.startTurn = function(direction) {

   
   socket.emit("newTurn",direction);
   var pivot = [];
   pivot[0] = nodes[0].x;
   pivot[1] = nodes[0].y;
   for (var i = 0; i < nodes.length; i++) {
      nodes[i].pivots.push(pivot);
   }

   // pivotPoints.push(pivot);
   nodes[0].direction = direction;
   DIRECTION = direction;
  }

  this.getPivot = function() {
   return pivot;
  }

  this.isTurning = function() {
   return pivot !== undefined;
  }
 

  //NEED TO INIT FROM PURELY ADD NODE
  nodes.push(new Node(x, y, Snake.directions.DOWN));
  for (var i = 0; i < 3; i++)
   this.addNode();

 }




 

 Snake.directions = {
  UP: "UP",
  DOWN: "DOWN",
  LEFT: "LEFT",
  RIGHT: "RIGHT"
 };



 var Node = function(x, y, direction) {
  this.direction = direction;
  this.color = undefined;
  this.pivots = []
  this.x = x;
  this.y = y;
 }


 Node.radius = 10;
 
 
 