 var Snake = function() {
     var thisObj = this;
     var DIRECTION = Snake.directions.UP;
     var color = Snake.colors.BLUE;
     var length;
     var pivot = undefined;
     
     var pivotPoints = [];

     var nodes = [];

   
     
     //implement
     //this.removeNode(node)
     //this.setDirection(node)
     //this.getHead()
     //this

     this.getNodes = function() {
         return nodes;
     }

     this.addNode = function() {
         var lastNode = nodes[nodes.length - 1];
         var newNode = new Node (0,0,DIRECTION);
         switch (lastNode.direction) {
             case Snake.directions.DOWN:
                 newNode.x = lastNode.x;
                 newNode.y = lastNode.y-Node.radius;
                 break;
             case Snake.directions.LEFT:
                 newNode.x =lastNode.x+Node.radius;
                 newNode.y = lastNode.y;
                 break;
             case Snake.directions.RIGHT:
                 newNode.x = lastNode.x-Node.radius;
                 newNode.y = lastNode.y;
                 break;
             case Snake.directions.UP:
                 newNode.x = lastNode.x;
                 newNode.y = lastNode.y+Node.radius;
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
            pivotPoints
         if (!thisObj.isTurning()) {

             pivot = [];
             pivot[0] = nodes[0].x;
             pivot[1] = nodes[0].y;

             nodes[0].direction = direction;
             DIRECTION = direction;
         }
     }

     this.getPivot = function() {
         return pivot;
     }

     this.isTurning = function() {
         return pivot !== undefined;
     }

     this.stopTurn = function() {
         pivot = undefined;
     }
     
      nodes.push(new Node(50, 50, Snake.directions.UP));
      for (var i = 0; i < 50; i++)
        this.addNode();

 }




 Snake.fromJSON = function(jsonString) {
     //parseJSONString
 }
 Snake.colors = {
     RED: "red",
     BLUE: "blue",
     YELLOW: "yellow",
     WHITE: "white",
     ORANGE: "orange"
 }

 Snake.directions = {
     UP: "UP",
     DOWN: "DOWN",
     LEFT: "LEFT",
     RIGHT: "RIGHT"
 };



 var Node = function(x, y, direction) {
     this.direction = direction;
     this.x = x;
     this.y = y;
 }


 Node.radius = 2;