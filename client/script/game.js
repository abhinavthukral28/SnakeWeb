var canvas;


var drawTimer;
var food = {};
var keys = 0;
var processing = false;
var animate = false;
var interval = 50;
var Game = {
    snakes: [],
    userSnake: undefined
};



$(document).ready(function() {

    canvas = document.getElementById('gameCanvas');
    canvas.width = window.innerWidth / 2;
    canvas.height = window.innerHeight / 2;
    food.radius = 10;
    food.color = "purple";
    food.x = canvas.width / 2;
    food.y = canvas.height / 2;
    initHandlers();
    drawTimer = setInterval(handleTimer, interval);
    drawCanvas();




});

function startGame() {
    interval = 7;
    animate = true;
}


function drawCanvas() {
    var context = canvas.getContext('2d');
    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    context.beginPath();
    context.arc(food.x, food.y, food.radius, 0, 2 * Math.PI, false);
    context.fillStyle = food.color;
    context.fill();
    context.stroke();

    var snake;
    var nodes;
    var tempNode;
    for (var i = 0; i < Game.snakes.length; i++) {
        snake = Game.snakes[i];
        if (eatingFood(snake)) {
            if (snake == userSnake)
            resetFood();
            snake.addNode();
        }

        nodes = snake.getNodes();

        for (var j = 0; j < nodes.length; j++) {

            tempNode = nodes[j];

            context.beginPath();
            context.arc(tempNode.x, tempNode.y, Node.radius, 0, 2 * Math.PI, false);
            context.fillStyle = snake.getColor();
            context.fill();
            context.stroke();

            if (animate) {
                if (tempNode.pivots.length !== 0) {

                    var pivot = tempNode.pivots[0];

                    if (tempNode.x === pivot[0] && tempNode.y === pivot[1]) {

                        if (j != 0) {
                            tempNode.direction = nodes[j - 1].direction;
                        }

                        tempNode.pivots.shift();

                    }
                }


                switch (tempNode.direction) {
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
}

function handleTimer() {
    drawCanvas();
}

function resetFood() {
    
    socket.emit("score",food);
    
    food.x = Math.random() * ((canvas.width - food.radius) - food.radius) + food.radius;
    food.y = Math.random() * ((canvas.height - food.radius) - food.radius) + food.radius;
}

function initHandlers() {
    $(document).keydown(handleKeyDown);
    $(document).keyup(handleKeyUp);
}


var ENTER = 13;
var RIGHT_ARROW = 39;
var LEFT_ARROW = 37;
var UP_ARROW = 38;
var DOWN_ARROW = 40;

function handleKeyUp(e) {
    if (keys > 0) {

        var keyPress = e.which;
        switch (keyPress) {
            case UP_ARROW:
            case RIGHT_ARROW:
            case LEFT_ARROW:
            case DOWN_ARROW:
                keys--;
                console.log(keys);
                break;
            default:
                break;
        }
    }
}

function handleKeyDown(e) {


    if (keys == 0) {
        var keyPress = e.which;
        if (Game.userSnake != undefined) {
            var currentDirection = Game.userSnake.getDirection();
            switch (keyPress) {
                case UP_ARROW:
                    keys++;
                    if (currentDirection != Snake.directions.DOWN)
                        Game.userSnake.startTurn(Snake.directions.UP);
                    e.stopPropagation();
                    e.preventDefault();
                    break;
                case RIGHT_ARROW:
                    keys++;
                    if (currentDirection != Snake.directions.LEFT)
                        Game.userSnake.startTurn(Snake.directions.RIGHT);
                    e.stopPropagation();
                    e.preventDefault();
                    break;
                case LEFT_ARROW:
                    keys++;
                    if (currentDirection != Snake.directions.RIGHT)
                        Game.userSnake.startTurn(Snake.directions.LEFT);
                    e.stopPropagation();
                    e.preventDefault();
                    break;
                case DOWN_ARROW:
                    keys++;
                    if (currentDirection != Snake.directions.UP)
                        Game.userSnake.startTurn(Snake.directions.DOWN);
                    e.stopPropagation();
                    e.preventDefault();
                    break;
                default:
                    break;
            }
        }



    }
    else {
        e.stopPropagation();
        e.preventDefault();
    }
}

function eatingFood(snake) {
    var head = snake.getNodes()[0];

    var dist = Math.pow(food.x - head.x, 2) + Math.pow(food.y - head.y, 2);
    var radiiDiff = Math.pow(food.radius - Node.radius, 2);
    var radiiSum = Math.pow(food.radius + Node.radius, 2);

    return (dist >= radiiDiff && dist <= radiiSum);



}


