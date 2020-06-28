var canvas, ctx;
var game = new Snake(50);

window.onload = function() {
  canvas = document.getElementById("canvas");
  ctx = canvas.getContext("2d");
  document.addEventListener("keydown", keyDownEvent);
  // render X times per second
  var speed = 11;
  game.playing = false;
  setInterval(draw, 1000 / speed);
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
    ctx.font = "50px Comic Sans MS";
    ctx.textAlign = "center";
    ctx.fillText("Snake", canvas.width/2, (canvas.height/2) - 50);
    ctx.font = "20px Comic Sans MS";

    if(game.score > 0){
    ctx.fillText("Score: " + game.score, canvas.width/2, (canvas.height/2));
  }else{
    ctx.fillText("Press or swipe up/down/left/right to move", canvas.width/2, (canvas.height/2));
  }
    ctx.fillText("Press space or swipe to start", canvas.width/2, (canvas.height/2) + 50);
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

document.addEventListener('touchstart', handleTouchStart, false);
document.addEventListener('touchmove', handleTouchMove, false);

var xDown = null;
var yDown = null;

function getTouches(evt) {
  return evt.touches ||             // browser API
         evt.originalEvent.touches; // jQuery
}

function handleTouchStart(evt) {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
};

function handleTouchMove(evt) {
    if ( ! xDown || ! yDown ) {
        return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if ( Math.abs( xDiff ) > Math.abs( yDiff ) ) {/*most significant*/
        if ( xDiff > 0 ) {
          if(game.playing){
            game.changeDirection("W");
          }else{
            game = new Snake(50);
          }
        } else {
          if(game.playing){
          game.changeDirection("E");
        }else{
          game = new Snake(50);
        }

        }
    } else {
        if ( yDiff > 0 ) {
        if(game.playing){
          game.changeDirection("N");
        }else{
          game = new Snake(50);
        }

        } else {
            if(game.playing){
              game.changeDirection("S");
            }else{
              game = new Snake(50);
            }


        }
    }
    /* reset values */
    xDown = null;
    yDown = null;
};
