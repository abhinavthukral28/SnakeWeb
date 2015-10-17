var canvas = document.getElementById("gameCanvas");
var userSnake;
var snakes = [];
var timer;
$(document).ready(function() {
    
    initHandlers();
    var snake = new Snake();
    snakes.push(snake);
    userSnake = snake;

    timer = setInterval(handleTimer, 100);
    canvas = document.getElementById('gameCanvas');
    drawCanvas();
});


function drawCanvas() {
    var context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0,0,canvas.width,canvas.height);
     
    var snake;
    var nodes;
    var tempNode;
    for (var i = 0; i < snakes.length; i++) {
        snake = snakes[i];
        nodes = snake.getNodes()
        for (var j = 0; j < nodes.length; j++) {
            
            tempNode = nodes[j];
            
            context.beginPath();
            context.arc(tempNode.x, tempNode.y, Node.radius, 0, 2 * Math.PI, false);
            context.fillStyle = snake.getColor();
            context.fill();
            context.stroke();
   
            switch (tempNode.direction)
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
            
                     
            if (snake.isTurning())
            {
                var pivot = snake.getPivot();
                
                if (tempNode.x === pivot[0] && tempNode.y === pivot[1])
                {
                    if (tempNode.direction != snake.getDirection())
                        tempNode.direction = snake.getDirection();
                    if (j+1 == nodes.length)
                    {
                        snake.stopTurn();
                    }
                }
            }
            
            
             
        }


    } 
   




}

function handleTimer() {
    drawCanvas();
}

function initHandlers(){
    $(document).keydown(handleKeyDown);
}


	var ENTER = 13;
	var RIGHT_ARROW = 39;
	var LEFT_ARROW = 37;
	var UP_ARROW = 38;
	var DOWN_ARROW = 40;


function handleKeyDown(e){
	var keyPress = e.which;
	var currentDirection = userSnake.getDirection();
	switch (keyPress) {
	    case UP_ARROW:
	        if (currentDirection != Snake.directions.DOWN)
	            userSnake.startTurn(Snake.directions.UP);
	        e.stopPropagation();
        	e.preventDefault();
	        break;
	    case RIGHT_ARROW:
	        if (currentDirection != Snake.directions.LEFT)
	            userSnake.startTurn(Snake.directions.RIGHT);
	        e.stopPropagation();
         	e.preventDefault();
	        break;
	    case LEFT_ARROW:
	        if (currentDirection != Snake.directions.RIGHT)
	            userSnake.startTurn(Snake.directions.LEFT);
	        e.stopPropagation();
	        e.preventDefault();
	        break;
	    case DOWN_ARROW:
	        if (currentDirection != Snake.directions.UP)
	            userSnake.startTurn(Snake.directions.DOWN);
	        e.stopPropagation();
        	e.preventDefault();
	        break;
	    default:
	        break;
	}
	
 

}

 
