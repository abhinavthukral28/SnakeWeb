 



var Snake = function()
{
    var thisObj = this;
    var DIRECTION = Snake.directions.UP;
    var color;
    var length;
    
    var nodes = [];
    
    nodes.push(new Node (50,50));
    //implement
    //this.addNode(node)
    //this.removeNode(node)
    //this.setDirection(node)
    //this.getHead()
    //this
    
    this.getNodes = function()
    {
        return nodes;
    }
    
    this.getDirection = function()
    {
        return DIRECTION;
    }
    
    
}




Snake.fromJSON = function(jsonString)
{
    //parseJSONString
}
Snake.colors = {
    RED : "red",
    BLUE : "blue",
    YELLOW: "yellow",
    WHITE: "white",
    ORANGE: "orange"
}

Snake.directions = {
    UP:"UP",
    DOWN:"DOWN",
    LEFT:"LEFT",
    RIGHT:"RIGHT"
};



var Node = function (x,y)
{
    this.x = x;
    this.y = y;
}

//module.exports = Snake;