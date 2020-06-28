describe("Snake", function() {
  var game;

  beforeEach(function() {
    game = new Snake(10);
  });

  it("should have a snake on the board", function() {
    expect(game.board[50]).toEqual('black');
  })

  it("should move when a frame is called", function() {
    game.frame()
    expect(game.board[50]).toEqual(undefined);
    expect(game.board[51]).toEqual('black');
  })

  it("should move up when frame is called and pointing north", function() {
    game.changeDirection("N")
    game.frame()
    expect(game.board[50]).toEqual(undefined);
    expect(game.board[40]).toEqual('black');
  })

  it("should move down when frame is called and pointing down", function() {
    game.changeDirection("S")

    game.frame()
    expect(game.board[50]).toEqual(undefined);
    expect(game.board[60]).toEqual('black');
  })

  it("should move left when frame is called and pointing west", function() {
    game.changeDirection("S")

    game.changeDirection("W")
    expect(game.board[51]).toEqual(undefined);
    expect(game.board[50]).toEqual('black');
  })

  it("can change to north when going east", function(){
    game.changeDirection("N")
    expect(game.snake[0].direction).toEqual("N")
  })

  it("can can't to north when going south", function(){
    game.changeDirection("S")
    game.changeDirection("N")
    expect(game.snake[0].direction).toEqual("S")
  })

  it("stops playing when hits a wall going north", function(){
    game.snake[0].position = 0;
    game.changeDirection("N")

    game.frame()
    expect(game.playing).toEqual(false)
  })

  it("knows if it's on the left wall", function(){
    expect(game.onLeftWall(0)).toEqual(true)
  })

  it("knows if it's not the left wall", function(){
    game.snake[0].position = 2;
    expect(game.onLeftWall()).toEqual(false)
  })

  it("knows if it's on the right wall", function(){
    expect(game.onRightWall(19)).toEqual(true)
  })

  it("knows if it's not the right wall", function(){
    game.snake[0].position = 2;
    expect(game.onRightWall()).toEqual(false)
  })

  it("can have a snake of length 2", function(){
    game.snake[0].position = 2;

    game.addTail()
    expect(game.snake.length).toEqual(2);
    expect(game.snake[1].position).toEqual(game.snake[0].position - 1);
  })

  it("can move when a snake has a length of 2", function(){
    game.snake[0].position = 2;
    game.addTail()
    game.frame()
    expect(game.snake[0].position).toEqual(3);
    expect(game.snake[1].position).toEqual(2);
    game.frame()
    expect(game.snake[0].position).toEqual(4);
    expect(game.snake[1].position).toEqual(3);
    game.changeDirection("S")
    game.frame()
    expect(game.snake[0].position).toEqual(14);
    expect(game.snake[1].position).toEqual(4);
    game.frame()
    expect(game.snake[0].position).toEqual(24);
    expect(game.snake[1].position).toEqual(14);
    game.frame()
    expect(game.snake[0].position).toEqual(34);
    expect(game.snake[1].position).toEqual(24);
  })

  it("fruit is added to the board", function(){
    game.addFruit(10)
    game.populateBoard()
    expect(game.board[10]).toEqual('green');
  })

  it("increases tails if snake hits fruit", function(){
    game.addFruit(3)
    game.populateBoard()
    game.snake[0].position = 2;
    expect(game.snake.length).toEqual(1);
    expect(game.board[3]).toEqual('green');
    game.frame()
    expect(game.snake.length).toEqual(2);
    expect(game.board[3]).toEqual('black');
  })

  it("can turn the board into a grid", function(){
    game.board = new Array(4)
    game.size = 2;
    game.board[game.board.length - 1] = "green"
    expected = [{x:0,y:0, value: undefined},{x:0,y:1, value: undefined},{x:1,y:0, value: undefined},{x:1,y:1, value:'green'}]
    expect(game.grid()).toEqual(expected)
  })

});
