var trex, trex_running, trex_collided, ground, groundImage, invisbleGround, cloud, cloudImage, obstacle1, obstacle2, obstacle3, obstacle4, obstacle5, obstacle6, cloudsGroup, ObstaclesGroup, gameState, count, gameOver, restart;
var PLAY=1;
var END=0;
gameState = PLAY;function preload(){
trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
groundImage = loadImage("ground2.png");
cloudImage = loadImage("cloud.png");
trex_collided = loadAnimation("trex_collided.png");
obstacle1 = loadImage("obstacle1.png");
obstacle2 = loadImage("obstacle2.png");
obstacle3 = loadImage("obstacle3.png");
obstacle4 = loadImage("obstacle4.png");
obstacle5 = loadImage("obstacle5.png");
obstacle6 = loadImage("obstacle6.png");
gameOverImg = loadImage("gameOver.png");
restartImg = loadImage("restart.png");
}

function setup() {
  createCanvas(600, 200);
  trex = createSprite(50,160,20,20)
  trex.addAnimation("trexRunning",trex_running);
  trex.scale = 0.5;
  trex.addAnimation("trexCollided", trex_collided);
  ground = createSprite(300,160,600,20);
  ground.addImage("Ground", groundImage);
  invisibleGround = createSprite(300,180,600,5)
  invisibleGround.visible = false
  ObstaclesGroup = new Group();
   cloudsGroup = new Group();
  count = 0;
  restart = createSprite(300,150);
  restart.visible = false;
  restart.addImage("restart",restartImg);
  gameOver = createSprite(300,100);
  gameOver.visible = false;
  gameOver.addImage("gameOver", gameOverImg);
}

function draw() {
  background(180);
  
  if(gameState === PLAY){
     spawnClouds();
  spawnObstacles();
   
    if(keyDown("space") && trex.y>=154){
 trex.velocityY= -7;
    }
      trex.velocityY= trex.velocityY + 0.5
  ground.velocityX= -3;
      if(ground.x<0){
    ground.x = ground.width/2;
      }
  
        count = count+1
  if(trex.isTouching(ObstaclesGroup)){
     gameState = END;
    
  }
  }
  else if(gameState === END){
    ground.velocityX = 0;
    trex.velocityY = 0;
    cloudsGroup.setVelocityXEach(0);
ObstaclesGroup.setVelocityXEach(0);
    trex.changeAnimation("trexCollided", trex_collided);
    ObstaclesGroup.setLifetimeEach(-1);
    cloudsGroup.setLifetimeEach(-1);
    restart.visible = true;
    gameOver.visible = true;
  }
  trex.collide(invisibleGround);
  
 text("Score:" + count, 530,30);
 
  drawSprites();
}

function spawnClouds(){
if(World.frameCount % 60 === 0){
cloud = createSprite(600,random(20,150),20,20) 
cloud.velocityX= -3;
  cloud.scale = 0.5;
  cloud.addAnimation("cloud", cloudImage);
  cloudsGroup.add(cloud);
  cloudsGroup.setLifetimeEach(200);
}
}

function spawnObstacles(){
  if(World.frameCount % 60 === 0){
   obstacle= createSprite(600,160,20,20);
    obstacle.velocityX = -3;
    var rand = Math.round(random(1,6));
    console.log(rand);
    switch(rand){
        case 1: obstacle.addImage("obstacle1",obstacle1);
        break;
        case 2: obstacle.addImage("obstacle2",obstacle2);
        break;
        case 3: obstacle.addImage("obstacle3",obstacle3);
        break;
        case 4: obstacle.addImage("obstacle4",obstacle4);
        break;
        case 5: obstacle.addImage("obstacle5",obstacle5);
        break;
        case 6: obstacle.addImage("obstacle6",obstacle6);
        break;
    }
    obstacle.scale= 0.5;
    ObstaclesGroup.add(obstacle);
    ObstaclesGroup.setLifetimeEach(200);
  }
}