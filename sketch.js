var bcg, bird, bee, insect, stone, turtle;
var robo, man, mario,mj,ground_run,win;
var bcgImage, birdImage, insectImage, stoneImage, turtleImage;
var roboImage, manImage, humanImage, winImage, gameOverImage,restartImage,flagImage,beeImage;

var gameState = "play";
var survivalTime=0;

var rs, gameOver;
var obstacleGroup;
var flag;
var stoneGroup,beeGroup;

function preload()
{
    bcgImage=loadImage("backgroundimage.jpg");

    beeImage=loadImage("beeimage.jpg");
    humanImage=loadImage("mariostandingimage.png");
    stoneImage=loadImage("stoneimage.jpg");
    
    restartImage=loadImage("resetbuttonimage.jpg");
    gameOverImage=loadImage("gameoverimage.jpg");
    
}

function setup() 
{
  
    createCanvas(displayWidth,displayHeight); 

    bcg = createSprite(50,30,width/2,height);
    bcg.addImage(bcgImage);
    //bcg.velocityX = -2;
    bcg.scale = 1.02;

    mario = createSprite(30,400,10,10);
    mario.addImage("move",humanImage);
    mario.scale = 0.15;
    mario.velocityX = 1;

    ground_run = createSprite(10,height-200,3200,20);
    ground_run.shapeColor = "#130f40";
    ground_run.visible = true;
    ground_run.velocityX = -3;

    gameOver=createSprite(width/2,height/4-2);
    gameOver.addImage("over",gameOverImage);
    gameOver.scale=0.02;
    gameOver.visible = false;

    rs=createSprite(width/2,height/2-50);
    rs.addImage("reset",restartImage);
    rs.scale=0.19;
    rs.visible = false;

    stoneGroup = new Group();
    beeGroup = new Group();
  
}

function draw() 
{
  
  background(0);
  drawSprites();

  stroke("#273c75");
  strokeWeight(3);
  fill("#4cd137")
  textSize(22);
  text("Mario's Survival Time:"+ survivalTime,100,600);
  
  if(gameState === "play")
     {       
      
          spawnBees();
          
          spawnStones();   
          
            survivalTime = survivalTime + 1; 
          
            

                if (bcg.x < 700)
                    {
                    bcg.x = bcg.width/2; 
                    }
                  
                if(keyDown("space")){
                            mario.velocityY = -10;          
                }
                      
              mario.velocityY = mario.velocityY + 0.8; 
          
              if(stoneGroup.isTouching(mario))
                  {
                    gameState = "end";
                  }
       }

  else if(gameState === "end"){
              bcg.velocityX = 0;
              stoneGroup.setLifetimeEach(0);
              mario.velocityX= 0;
              rs.visible = true;
              gameOver.visible = true;
            
  
          if(mousePressedOver(rs)){
            gameState = "play";
            gameOver.visible = false;
            rs.visible = false;
            bcg.velocityX = -4;
            survivalTime=0;
           }
          }
  
  mario.collide(ground_run);
  drawSprites();
  
}

    function spawnBees()
    {
          if(frameCount % 150 === 0)
          {
            bee = createSprite(800,random(30,500),10,10);
            bee.addImage("bb",beeImage);
            bee.scale =0.08;
            bee.velocityX = -2;
            bee.lifetime = 150;
            beeGroup.add(bee);
          }
    }


          function spawnStones()
          {
                if(frameCount % 200 === 0)
                  {
                    stone = createSprite(random(50, 600),550,10,10);
                    stone.addImage("stones",stoneImage);
                    stone.scale = 0.1;
                    stone.velocityX = -2;
                    stone.lifetime = 200;
                    stoneGroup.add(stone);
                  }
          }
