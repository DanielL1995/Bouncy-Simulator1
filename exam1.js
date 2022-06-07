const board = require("./ExamInput.js").board;



  class Vector{
    constructor(x,y){
      this.x =x; // -1 / 1
      this.y =y; // -1 / 1
    }
  }
  class Ball{
    constructor(x,y,vector){
      this.x =x;
      this.y =y;
      this.vector = vector;
    }
    move(){
     
     this.x += this.vector.x;
     this.y += this.vector.y;
     }
  }
  //State
  // 0 - before start
  // 1 - active
  // 2 - finished
  class Game{
    constructor(ball, board, state=0){
      this.ball = ball;
      this.board = board;
      this.state = state;
      this.startingX = ball.x;
      this.startingY = ball.y;
      this.moves = 0; 
    }
    start(){
      this.state =1;
     
      do{
          this.makeMove()
          this.moves++;
          
      }while(!this.isBallBackOnStartingPossition())
          this.state =2
          console.log(`Moves: ${this.moves}`);
    }

    isBallBackOnStartingPossition(){
       if (
         this.ball.x !== this.startingX ||
         this.ball.y !== this.startingY)
        {
          return false
        }else{
          return true
        }
     }
    
    makeMove(){
      
      if(this.checkForYcollision())
      {
         this.ball.vector.y *= -1;
        }else if(this.checkForXcollision())
      { 
          this.ball.vector.x *= -1;
        }else{
          this.ball.move()
          this.board[this.ball.x][this.ball.y]="1"
          console.table(board);
          this.board[this.ball.x][this.ball.y]="0"
          console.log(`Vector x: ${this.ball.vector.x}, Vector y:${this.ball.vector.y} `);
          
      }
    };

    checkForYcollision(){
      
      if (this.board[this.ball.x][this.ball.y + this.ball.vector.y] === "X"){
        return true
      }else{
        return false
      }
      
    }
    checkForXcollision(){
      if(this.board[this.ball.x + this.ball.vector.x][this.ball.y] === "X"){
        return true
      }else{
        return false
      }
    }
  }
  class BallGenerator {
    constructor(board){
      this.board = board;
    }
    generateBall(){
        for(let row=0; row < board.length; row++){
            for(let column = 0; column < board[row].length; column++){
                if(board[row][column] === "1"){
                    
                    return new Ball (column,row, new Vector(1,1))
                    
                }
            }
        }
      }
    }
  let ballGenerator = new BallGenerator(board)
  let ball = ballGenerator.generateBall();
  let game = new Game(ball, board, 0);
 game.start()
  