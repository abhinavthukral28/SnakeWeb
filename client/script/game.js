var canvas = document.getElementById("gameCanvas");

var snakes = [];
var timer;
$(document).ready(function() {
    snakes.push(new Snake());

    timer = setInterval(handleTimer, 100);
    canvas = document.getElementById('gameCanvas');
    drawCanvas();
});


function drawCanvas() {
    var context = canvas.getContext('2d');
    var radius = 2;
    var snake;
    var nodes;
    var tempNode;
    for (var i = 0; i < snakes.length; i++) {
        snake = snakes[i];
        nodes = snake.getNodes()
        for (var j = 0; j < nodes.length; j++) {
            
            tempNode = nodes[j];
            
            context.beginPath();
            context.arc(tempNode.x, tempNode.y, radius, 0, 2 * Math.PI, false);
            context.fillStyle = 'green';
            context.fill();
            context.stroke();
            
            
            switch (snake.getDirection())
            {
                case Snake.directions.DOWN:
                      tempNode.y++;
                      break;
                case Snake.directions.LEFT:
                     tempNode.x--;
                     break;
                case Snake.directions.RIGHT:
                     tempNode.x++;
                     break;
                case Snake.directions.UP:
                     tempNode.y--;
                     break;
                default:
                    break;
            }
            
             
        }


    } 
   




}

function handleTimer() {


    drawCanvas();
}