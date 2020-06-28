var canvas, ctx;
var game = new Snake(50);

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  // render X times per second
  var x = 16;
  setInterval(draw, 1000 / x);

};

function draw(){
  ctx.fillStyle = "pink";
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.fillStyle = "black";
  game.frame()

  game.grid().forEach(function(row){
    if(row.value === undefined){
      ctx.fillStyle = "pink";
    }else{
      ctx.fillStyle = row.value;
    }
    ctx.fillRect(row.y * 10, row.x * 10 , 10, 10);

    ctx.fillStyle = "red";
    ctx.font = "30px Comic Sans MS";
    // ctx.textAlign = "left";
    ctx.fillText(game.score, 450, 30);

  })
  if (!(game.playing)){
    ctx.fillStyle = "pink";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "red";
    ctx.font = "30px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText("Game Over", canvas.width/2, (canvas.height/2) - 50);
    ctx.fillText("Score: " + game.score, canvas.width/2, (canvas.height/2));
    ctx.fillText("Press space to try again", canvas.width/2, (canvas.height/2) + 50);
  }
}

function keyDownEvent(e) {
  switch (e.keyCode) {
  case 37:
    game.changeDirection("W");
    break;
  case 38:
    game.changeDirection("N");
    break;
  case 39:
    game.changeDirection("E");
    break;
  case 40:
    game.changeDirection("S");
    break;
  case 32:
    game = new Snake(50);
    break;
  }
}
