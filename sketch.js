const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var player, obstacle, score;

var platform, platformGroup, ground, startingPlatform;

var START = 0, PLAY = 1, END = 2;

var gameState = START;

var wavesIMG;

function preload(){
  waves = loadImage("Waves.jpg");
}

function setup(){
  var canvas = createCanvas(800, 400);
  engine = Engine.create();
  world = engine.world;

  player = createSprite(50, 200, 20, 20);
  player.shapeColor = "blue";

  startingPlatform = createSprite(50, 360, 100, 50);
  startingPlatform.shapeColor = "black";

  platformGroup = new Group();


  ground = createSprite(200, 390, 1600, 20);
  ground.x = ground.width /2;
  ground.addImage(wavesIMG);

  score = 0;

}

function draw(){
  background(255,253,208);
  textSize(14);
  text("Score: "+ score, 700,50);



  

  if(gameState === START){
    textSize(17);
    text("Press Space To Start The Game", 270, 200);
    
    textSize(12);
    text("Hint: Press Space To Jump And The Right Arrow to Move Forward", 10, 30);


  }

  if(keyDown("space") && gameState === START){
    gameState = PLAY;
  }
  else if(gameState === PLAY){
    ground.velocityX = 2;
    score = score + Math.round(getFrameRate()/60);


  if(ground.x > 400){
    ground.x = ground.width/2;
    };

  if(player.x > 800){
    player.x = player.width/2;
    };

  if(keyDown("space") && player.y >= 320 && player.y <= 360){
    player.velocityY = -12;
    };

  if(keyDown("RIGHT_ARROW")){
    player.velocityX = 5;
    }
  else{
    player.velocityX = 0;
    };

    player.velocityY = player.velocityY + 0.8;   
    var platform1 = spawnPlatforms();
    
    player.collide(ground);
    console.log(player.y);
    player.collide(platformGroup);
    player.collide(startingPlatform);
  };

  if(gameState === PLAY && player.y === 370){
    gameState = END;
  }
  else if(gameState === END){
    textSize(17);
    text("Game Over!", 350, 100)
    text("Press R To Try Again!", 325, 150)
    platformGroup.setVelocityXEach(0);
    platformGroup.setLifetimeEach(-1);
    reset();
    ground.velocityX = 0;
    player.velocityX = 0;
  }
  
   
  

  


  /*var platform1 = spawnPlatforms();
  console.log("draw =" + platform1);
  */
  

  /*player.collide(ground);
  console.log(player.y);
  player.collide(platformGroup);
  player.collide(startingPlatform);*/
  



  //player.y = player.y + 1;







  drawSprites();
}

function spawnPlatforms() {
  //write code here to spawn the clouds
  if (frameCount % 60 === 0) {
    platform = createSprite(800, 355, 40, 50);
    platform.shapeColor = "brown";
    //platform.x = Math.round(random(80,120));
    //cloud.scale = 0.5;
    platform.velocityX = -2;
    
     //assign lifetime to the variable
    platform.lifetime = 340;
    
    //adjust the depth
    //cloud.depth = trex.depth;
    //trex.depth = trex.depth + 1;
    
    //add each cloud to the group
    platformGroup.add(platform);
    
    //console.log("platform = " + platform);
    //return platform;

  }


  //return platform;

  //console.log("hello = " + platform); 

   
}

function reset(){
  if(keyDown("r")){
    gameState = START;
    player.y = 200;
    player.x = 50;
    platformGroup.destroyEach();
  }
}







































/* const Engine = Matter.Engine;
const World = Matter.World;
const Bodies=Matter.Bodies; 

var engine, world, object;
var ball, ground;

function setup() {
  var canvas = createCanvas(400,400);

  engine = Engine.create();
  world = engine.world;

  //createSprite(400, 200, 50, 50);
  
  var options = {
    isStatic: true
  };

  ground = Bodies.rectangle(200,390,200,20, options);
  World.add(world,ground);
  
  var options_ball = {
    restitution: 1.0
  };

  ball = Bodies.circle(200,120,20, options_ball);
  World.add(world,ball);

  console.log(ground);
}

function draw() {
  background(200,55,220);  
  Engine.update(engine);
  
  rectMode(CENTER);
  rect(ground.position.x,ground.position.y,200,20);

  ellipseMode(RADIUS);
  ellipse(ball.position.x,ball.position.y,20,20);
  



  drawSprites();

  
}*/