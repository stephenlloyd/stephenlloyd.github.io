function Snake(size) {
  this.size = size;
  this.wall = [];

  this.snake = [this.newSnake((size * size / 2 ), "black", "E")];
  this.playing = true;
  this.populateBoard();
  this.addFruit();
  this.score = 0;
}

Snake.prototype.frame = function() {
  self = this;
    if (this.playing) {
      this.progressSnake()
      if(this.snake[0].position == this.fruitPosition){
        this.addTail();
        this.score += 10;
        if(this.score % 30 == 0){
          this.addWall();
        }
        this.addFruit();
      }
      this.populateBoard()
    }
};


Snake.prototype.progressSnake = function(){
  var snake = []
  for (i = 0; i < this.snake.length; i++) {
    if(i == 0){
      var direction = this.snake[i].direction
    }else {
      var direction = this.snake[i - 1].direction
    }
    var s = this.snake[i]
    var pos = this.nextPosition(s.position, s.direction)
    if(i == 0 && this.board[pos]=="black"){
      this.playing = false;
    }
    snake.push(this.newSnake(pos, s.marker, direction));
  }
  if ((this.onLeftWall(this.snake[0].position) && (this.snake[0].direction == "W") || (this.onRightWall(this.snake[0].position) && (this.snake[0].direction == "E")))){
    this.playing = false
  }
  this.snake = snake;
}

Snake.prototype.nextPosition = function(position, direction){
  var position;
  if(direction == 'E'){
    position = position+1;
  }
  if(direction == 'N'){
    position = position - this.size;
  }
  if(direction == 'S'){
    position = position + this.size;
  }
  if(direction == 'W'){
    position = position - 1;
  }
  if(position > this.board.length || position < 0){
    this.playing = false;
  }

  return position;
}

Snake.prototype.populateBoard = function(){
  var board = new Array(this.size * this.size);
  board[this.fruitPosition] = "green"
  console.log(this.wall)
  this.wall.forEach(function(wall){
    board[wall] = "black"
  })
  this.snake.forEach(function(snake){
    board[snake.position] = snake.marker;
  });
  this.board = board;
};


Snake.prototype.changeDirection = function(newDirection){
  if(newDirection == 'N' && this.snake[0].direction != 'S'){
    this.snake[0].direction = newDirection;
  }
  if(newDirection == 'E' && this.snake[0].direction != 'W'){
    this.snake[0].direction = newDirection;
  }
  if(newDirection == 'W' && this.snake[0].direction != 'E'){
    this.snake[0].direction = newDirection;
  }
  if(newDirection == 'S' && this.snake[0].direction != 'N'){
    this.snake[0].direction = newDirection;
  }
}

Snake.prototype.addTail = function() {
  var newSnake = this.newSnake(this.snake[this.snake.length -1].position, this.snake[this.snake.length -1].marker, this.snake[this.snake.length -1].direction)
  if(newSnake.direction == "E"){
    newSnake.position = newSnake.position - 1
  }
  if(newSnake.direction == "S"){
    newSnake.position = newSnake.position - this.size
  }
  if(newSnake.direction == "W"){
    newSnake.position = newSnake.position + 1
  }
  if(newSnake.direction == "N"){
    newSnake.position = newSnake.position + this.size
  }

  this.snake.push(newSnake)
}

Snake.prototype.newSnake = function(position, marker, direction){
  return { position: position, marker: marker, direction: direction}
}

Snake.prototype.onLeftWall = function(position) {
  return position % this.size == 0;
}

Snake.prototype.onRightWall = function(position) {
  return (position + 1) % this.size == 0;
}

Snake.prototype.addFruit = function(pos) {
  self = this;
  if(!pos){
    var pos = Math.floor(Math.random() * self.board.length)
    while (this.board[pos] == "black" || (pos % self.size == 0)) {
      pos = Math.floor(Math.random() * self.board.length);
    }
  }
  this.fruitPosition = pos;
}

Snake.prototype.addWall = function() {
  self = this;
  var pos = Math.floor(Math.random() * self.board.length)
  while (this.board[pos] == "black" || (pos % self.size == 0)) {
    pos = Math.floor(Math.random() * self.board.length);
  }

  this.wall.push(pos);
}

Snake.prototype.grid = function(){
  var copy = Array.from(this.board)
  var newArr = [];
  while(copy.length) newArr.push(copy.splice(0, this.size));

  var x = newArr.map(function(currentelement, topIndex) {
    return currentelement.map(function(currentelement, middleIndex) {
      return {x: topIndex,y: middleIndex, value: currentelement}
    });
  });

  return x.flat();


}
