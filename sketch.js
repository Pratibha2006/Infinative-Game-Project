var PLAY;
var END;
var gameState;
var score;
var charecter,charecterImage;
var rock,rockImage,rockGroup;
var coin,coinImage,coinGroup;
var ground,groundImage;
var invisibleground;
var restart,restartImage;

function preload(){
  charecterImage = loadImage("character.png");
  rockImage = loadImage("rock.png");
  coinImage = loadImage("coin.png");
  groundImage = loadImage("background.png");
  restartImage = loadImage("restart.png");
}

function setup() {
  createCanvas(600,400);
  
  ground = createSprite(300,230,1200,10);
  ground.addImage(groundImage);
  ground.x=ground.width/2;
  
  charecter = createSprite(50,300,10,10);
  charecter.addImage(charecterImage);
  charecter.scale=0.4;
  
  invisibleground = createSprite(300,390,600,10);
  invisibleground.depth = ground.depth;
  invisibleground.depth = invisibleground.depth - 1;
  
  charecter.debug = false;
  charecter.setCollider("rectangle",0,210,1,100);
  
  coinGroup = new Group();
  rockGroup = new Group();
  
  score = 0;
  PLAY=1;
  END=0;
  gameState=1;
}

function draw() {
 
   ground.velocityX=-(4+score/200);
  
  if (gameState===PLAY) {
    score = score + Math.round(frameCount/100);
  
  if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if (keyDown("space") && charecter.y>=200) {
      charecter.velocityY=-12;
  } 
  
  if(charecter.isTouching(coinGroup)) {
     coinGroup.destroyEach();
  }
  
  if(charecter.isTouching(rockGroup)) {
     score = score+1;
     rockGroup.destroyEach();
     coinGroup.setVelocityEach(0);
     rockGroup.setVelocityEach(0);
     ground.velocityX=0;
     gameState=END;
  }
    
  charecter.velocityY=charecter.velocityY+0.8;
  
  spawnrock();
  swapncoin();
  
  charecter.collide(invisibleground);
  }
  
  if(gameState===END) {
  restart = createSprite(300,200,10,10);
  restart.addImage(restartImage);
  restart.scale=1.5;
  }
  
  
  drawSprites();
  
  textSize(20);
  stroke("black");
  strokeWeight(2);
  fill("white");
  text("Score = " + score,450,50);
}

function spawnrock() {
  if (frameCount % 240 === 0) {
  rock = createSprite(600,360,10,10);
  rock.addImage(rockImage);
  rock.scale = 0.2;
  rock.velocityX=-4;
  rock.setlifetime = 150;
  rockGroup.add(rock);
}
}

function swapncoin(){
   if (frameCount % 80 === 0) {
  coin = createSprite(600,350,10,10);
  coin.addImage(coinImage);
  coin.velocityX=-4;
  coin.scale=0.4;
  coin.setlifetime = 150;
  coinGroup.add(coin);
  coin.depth = charecter.depth;
  charecter.depth = charecter.depth+1;
}
}

