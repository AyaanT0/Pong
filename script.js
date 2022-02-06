function setup(){
  createCanvas(500, 500);
  
}



let y;
let y2
let paddleUp;
let motion = "no";
let wallcollided = false;
lose = false;
let score = 0;

function genPY(r1, r2){
  pY = Math.random(r1, r2);
  return pY;
}

class AI {
  constructor(){
    this.AIX = 470;
    this.AIW = 15;
    this.AIH = 80;
  }
  
  animate(){
    this.AIY = ball.getCoords();
    fill(255);
    if (this.AIY <= 420) rect(this.AIX, this.AIY, this.AIW, this.AIH);
    if (this.AIY >= 420) rect(this.AIX, 420, this.AIW, this.AIH)
  }
  
  getCoords(){
    return this.AIY
  }
}


class Ball {
  constructor(){
    this.ballX = 400;
    this.ballY = 250;
    this.diam = 20;
    this.collided = false;
  }
  
  render(){
    ellipse(this.ballX, this.ballY, this.diam);
  }

  bounce(){
    y = paddle.getCoords();
    y2 = Hal.getCoords();
    if (this.ballX <= 30 && !this.collided){
      if (this.ballY >= y && this.ballY <= y + 80){ 
        this.collided = true;
        wallcollided = false;
        if (paddleUp) motion = "up";
        if (!paddleUp) motion = "down";
        score += 1;
     }
    }
    
    if (this.collided && !wallcollided){
      if (this.ballX >= 470 && this.ballY >= y2 && this.ballY <= y2 + 80){
        wallcollided = true;
        this.collided = false;
      }
    }
    
   //starting motion
   if (!this.collided && !wallcollided) this.ballX -= 5;
   //when ball hits paddle for the first time 
   if (this.collided && !wallcollided) this.ballX += 5;
   //when ball hits wall
   if (this.ballX > 490){ this.collided = false; wallcollided = true; }
   //come back after hitting wall 
   if (wallcollided && !this.collided) this.ballX -= 5;
   //so ball does not go willy nilly
   if (motion == "up") this.ballY -= 5;
   if (motion == "down") this.ballY += 5;
   if (motion == "no") this.ballY += 0;
   //make sure ball bounces back after hitting roof and floor
   if (this.ballY < 0) motion = "down";
   if (this.ballY > 490) motion = "up";
   if (this.ballX < 10) lose = true;
    
  }

  getCoords(){
    return this.ballY;
  }
}

class Paddle {
  constructor(){
    this.paddleX = 10;
    this.paddleY = 200;
    this.width = 15;
    this.height = 80;
    this.moveAble = false;
  }

  getCoords(){
    return this.paddleY;
  }
  

  animate(){
    rect(this.paddleX, this.paddleY, this.width, this.height);
   
  }

  move(whaffwoo, bool){

   if (this.paddleY >= 0 && this.paddleY <= 420) this.paddleY += whaffwoo;
   if (this.paddleY < 0 && whaffwoo > 0)this.paddleY += whaffwoo;
   if (this.paddleY > 420 && whaffwoo < 0) this.paddleY += whaffwoo;
   paddleUp = bool;
  }


}

paddle = new Paddle();
ball = new Ball();

Hal = new AI();

function draw(){
 if (!lose){ 
  AIY =  ball.getCoords();   
  background(0);
  rect(250, 0, 5, 500);

  paddle.animate();
  if (keyIsDown(UP_ARROW)) paddle.move(-5, true);
  else if (keyIsDown(DOWN_ARROW)) paddle.move(5, false);
  else if (keyIsPressed && key == 'w') paddle.move(-5);
  else if (keyIsPressed && key == 's') paddle.move(5);
  fill(255);
  console.log(paddleUp)
  ball.bounce();
  ball.render();
  Hal.animate();
  textSize(30);
  text("Your score: ", 300, 25);
  text(score, 455, 27)
  }
 if (lose) loseScreen();
}

function loseScreen(){
  background(255, 0, 0);
  fill(0, 255, 255);
  textSize(20);
  text("You lose!", 215, 230);
  text("Press 'r' to play again!", 170, 250);
  text("Your score: "+score, 200, 210);
  if (keyIsDown(82)){
    location.reload()
  }
}
