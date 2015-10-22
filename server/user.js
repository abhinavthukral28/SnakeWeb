    var user = function(username, color, startPoint, index) {
        this.username = username;
        this.ready = false;
        var score = 0;
        this.index = index;
        this.snake = new Snake(username, color, startPoint);
        this.incrementScore = function(){
            score = score + 1;
            return score;
        };
        this.getScore = function(){
          return score;
        };
    }
    module.exports = user;


    var Snake = function(username, color, startPoint) {
        this.color = color;
        this.username;
        this.x = startPoint[0];
        this.y = startPoint[1];
    }

