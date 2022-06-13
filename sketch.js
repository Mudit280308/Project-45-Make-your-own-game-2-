const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var gun1, gun2, gun3, gun4;
var gun1Img, gun2Img, gun3Img, gun4Img;
var PC, ballS, ballM, ballL;
var bullet, missile, bulletImg, missileImg;
var PCImg, ball1Img, ball2Img;
var backgroundImg;

var HealthBar, Health0Img, Health1Img, Health2Img, Health3Img, Health4Img, Health5Img;
var score = 0;

var gameState = 0;

function preload(){

  gun1Img = loadImage("gun 1.png");
  gun2Img = loadImage("gun 2.png");
  gun3Img = loadImage("gun 3.png");
  gun4Img = loadImage("gun 4.png");

  PCImg = loadImage("PC.png");

  bulletImg = loadImage("bullet.png");
  missileImg = loadImage("missile.png");
  
  ball1Img = loadImage("ball1.png");
  ball2Img = loadImage("ball2.png");

  backgroundImg = loadImage("background.webp");

  PCImg = loadImage("PC UFO.png");

  Health0Img = loadImage("Health0.png");
  Health1Img = loadImage("Health1.png");
  Health2Img = loadImage("Health2.png");
  Health3Img = loadImage("Health3.png");
  Health4Img = loadImage("Health4.png");
  Health5Img = loadImage("Health5.png");


}

function setup() {
  createCanvas(windowWidth,windowHeight);
  engine = Engine.create();
  world = engine.world;


  gun1 = createSprite(windowWidth-100,windowHeight-(windowHeight-100),10,10);
  gun1.addImage(gun1Img, "gun1Image");
  gun1.scale = 0.47;
  gun1.debug = true;

  gun2 = createSprite(windowWidth-100,windowHeight-100,10,10);
  gun2.addImage(gun2Img,"gun2Image");
  gun2.scale = 0.47;
  gun2.debug = true;

  gun3 = createSprite(windowWidth-(windowWidth-100),windowHeight-(windowHeight-600),10,10);
  gun3.addImage(gun3Img,"gun3Image");
  gun3.scale = 0.47;
  gun3.debug = true;

  gun4 = createSprite(windowWidth-(windowWidth-100),windowHeight-(windowHeight-100),10,10);
  gun4.addImage(gun4Img,"gun4Image");
  gun4.scale = 0.47;
  gun4.debug = true

  PC = createSprite(windowWidth-(0.5*windowWidth), windowHeight-(0.5*windowHeight),100,100);
  PC.addImage(PCImg, "playingCharaterImage");
  PC.scale = 0.35;
  PC.setCollider("rectangle", 0, 0, 400, 200, 0);
  PC.debug = true;

  HealthBar = createSprite(windowWidth-(windowWidth-400), windowHeight-(windowHeight-50),10,10);


}

function draw() {
  background(backgroundImg);
  edges=createEdgeSprites();
  Engine.update(engine);

  PC.bounceOff(edges);

  /*if(gameState===0){
    background("black");

    fill ("red");
    textSize(17);
    text("RULES",windowWidth-(windowWidth-600),windowHeight-(windowHeight-50));
    
    fill ("white");
    textSize(17);
    text("Press UP ARROW to move up, DOWN ARROW to move down, RIGHT ARROW to move right, LEFT ARROW to move left", 260, windowHeight-(windowHeight-100));

    fill ("white");
    textSize(17);
    text("PRESS AND HOLD SHIFT AND YIUR PREFFERENT DIRECTION KEYS TOGETHER TO INCRESE YOUR SPEED", 270, windowHeight-(windowHeight-150));

    fill ("white");
    textSize(17);
    text("DO NOT TOUCH THE GUNS OR YOUR SPACESHIP WILL GET DESTROYED",390, windowHeight-(windowHeight-200));

    fill ("blue");
    textSize(17);
    text("Press 'P' to start playing",450, windowHeight-(windowHeight-250));

    if(keyDown("p")){
      gameState = 1;
    }

  }*/

  //if(gameState===1){
  //PC.bounceOff(edges);
  //PC.bounciness = 0.5;


PC.rotateToDirection = true;


if(PC.collide(gun1)||PC.collide(gun2)||PC.collide(gun3)||PC.collide(gun4)){
  PC.destroy();
}

if(mousePressedOver(gun1)){
  gun1.destroy();
}
if(mousePressedOver(gun2)){
  gun2.destroy();
}
if(mousePressedOver(gun3)){
  gun3.destroy();
}
if(mousePressedOver(gun4)){
  gun4.destroy();
}

  if(keyDown("SPACE")){
    bullet = createSprite(windowWidth-(0.5*windowWidth), windowHeight-(0.5*windowHeight),5,5);
    bullet.addImage(bulletImg, "bulletImage");
    bullet.scale = 0.4;
    bullet.lifetime = 38;
    bullet.bounceOff(edges);
    bullet.bounciness = 0.5
  }

  

  console.log(score + " - this is the score");

  


  spawnBallsRight();
  spawnBallsLeft();
  spawnBallsBelow();
  spawnBallsAbove();

  windowResized();
  PCMovement();

  drawSprites();
}


// to spawn the balls/NPC/obstacles from the right border of the canvas
function spawnBallsRight() {
  if(frameCount % 65 === 0) {
    ball = createSprite(random(windowWidth+15, windowWidth), random(windowHeight-(windowHeight/2+30), windowHeight-(windowHeight/2-30)),10,40);
    ball.debug = true;
    ball.scale = 0.25;
    ball.lifetime = 150;
    //ball.velocityX = -(6 + 3*score/100);
    ball.setVelocity(random(-6,-12), random(-1,1));

    if(PC.isTouching(ball)){
      score = score+1;
    }

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ball.addImage(ball1Img);
              break;
      case 2: ball.addImage(ball2Img);
              break;
      default: break;
    }
  }
}

// to spawn the balls/NPC/obstacles from the left border of the canvas
function spawnBallsLeft() {
  if(frameCount % 85 === 0) {
    ball = createSprite(random(windowWidth-(windowWidth-15), windowWidth-windowWidth), random(windowHeight-(windowHeight/2+30), windowHeight-(windowHeight/2-30)),10,40);
    ball.debug = true;
    ball.scale = 0.25;
    ball.lifetime = 150;
    //ball.velocityX = -(6 + 3*score/100);
    ball.setVelocity(random(6,12), random(-1,1));

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ball.addImage(ball1Img);
              break;
      case 2: ball.addImage(ball2Img);
              break;
      default: break;
    }
  }
}

// to spawn the balls/NPC/obstacles from the bottom border of the canvas
function spawnBallsBelow() {
  if(frameCount % 75 === 0) {
    ball = createSprite(random(windowWidth-(windowWidth/2-150), windowWidth-(windowWidth/2+150)), random(windowHeight+15, windowHeight),10,40);
    ball.debug = true;
    ball.scale = 0.25;
    ball.lifetime = 150;
    //ball.velocityX = -(6 + 3*score/100);
    ball.setVelocity(random(-6,6), random(-8,-12));

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ball.addImage(ball1Img);
              break;
      case 2: ball.addImage(ball2Img);
              break;
      default: break;
    }
  }
}

// to spawn the balls/NPC/obstacles from the top border of the canvas
function spawnBallsAbove() {
  if(frameCount % 105 === 0) {
    ball = createSprite(random(windowWidth-(windowWidth/2-150), windowWidth-(windowWidth/2+150)), random(windowHeight-(windowHeight-15), windowHeight-windowHeight),10,40);
    ball.debug = true;
    ball.scale = 0.25;
    ball.lifetime = 150;
    //ball.velocityX = -(6 + 3*score/100);
    ball.setVelocity(random(-6,6), random(8,12));

    //generate random obstacles
    var rand = Math.round(random(1,2));
    switch(rand) {
      case 1: ball.addImage(ball1Img);
              break;
      case 2: ball.addImage(ball2Img);
              break;
      default: break;
    }
  }
}

// a function to resize the window when for example inspect is opened in the browser
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  background(backgroundImg);

  gun1.x = windowWidth-100;
  gun1.y = windowHeight-(windowHeight-100);

  gun2.x = windowWidth-100;
  gun2.y = windowHeight-100

  gun3.x = windowWidth-(windowWidth-100);
  gun3.y = windowHeight-(windowHeight-600);

  gun4.x = windowWidth-(windowWidth-100);
  gun4.y = windowHeight-(windowHeight-100);

}



// a function to move the playing charater
function PCMovement(){
  if(keyWentDown(65)){
    PC.velocityX = PC.velocityX-8;
    if(keyDown(16)){
      PC.velocityX = PC.velocityX-14;
    }
  }
  if(keyWentUp(65)){
    PC.velocityX = 0;
  }
  
  if(keyWentDown(87)){
    PC.velocityY = PC.velocityY-8;
    if(keyDown(16)){
      PC.velocityY = PC.velocityY-14;
    }
  }
  if(keyWentUp(87)){
    PC.velocityY = 0;
  }
  
  if(keyWentDown(68)){
    PC.velocityX = PC.velocityX+8;
    if(keyDown(16)){
      PC.velocityX = PC.velocityX+14;
    }
  }
  if(keyWentUp(68)){
    PC.velocityX = 0;
  }
  
  if(keyWentDown(83)){
    PC.velocityY = PC.velocityY+8;
    if(keyDown(16)){
      PC.velocityY = PC.velocityY+14;
    }
  }
  if(keyWentUp(83)){
    PC.velocityY = 0;
  }
}