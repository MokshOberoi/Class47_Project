/*You are trying to reach another planet. 
Aliens on that planet don't want you to enter their planet.
So the aliens are sending spaceships to kill you.
Control you spaceship with up arrow and down arrow keys.
Press space to shoot bullets that destory the obstacles in your way.
You have 3 lives and 50 bullets , Use them well.
BEST OF LUCK !!! */

var bgSprite,bgImage;
var player,playerImage;
var bullet, bulletImage;
var enemy,enemyImage;
var meteor, meteorImage;
var obstacleGroup;
var totalBullets = 50;
var bulletGroup;
var life = 3;
var currentlife = 3;
const PLAY = 0;
const END = 1;
var gameState = PLAY; 
const maxScore = 800;
var score = 0;
var livesImage;
var livesGroup;
var gameOver ,gameOverImg;

function preload(){
      //Load the images
      bgImage = loadImage("Images/bg2.jpg");
      playerImage = loadImage("Images/spaceship.png");
      bulletImage = loadImage("Images/bullet.png");
      enemyImage = loadImage("Images/enemy spaceship.png");
      meteorImage = loadImage("Images/meteor.png");
      livesImage = loadImage("Images/lives.png");
      gameOverImg = loadImage("Images/game over.png");

}
  
function setup(){

    createCanvas(windowWidth,windowHeight);
    //Create bg and add velocity to it 
    bgSprite = createSprite(windowWidth/2,windowHeight/2,50,50);
    bgSprite.addImage(bgImage);
    bgSprite.scale = 0.7;
    bgSprite.velocityX = -3;
    //Create player and add image
    player = createSprite(100,windowHeight-50,10,20);
    player.setCollider("circle", 0, -3, 110);    
    player.addImage(playerImage);
    player.scale = 0.5;

    obstacleGroup = new Group();

    bulletGroup = new Group();

    livesGroup = new Group();

    for (var i = 0;i<currentlife;i++){
         var heart = createSprite(displayWidth-(currentlife-i)*60,40,20,20);
         heart.addImage(livesImage);
         heart.scale = 0.2;
         livesGroup.add(heart);
    }

}

function draw(){
      //Background should not end
      if (bgSprite.x<100){
          bgSprite.x = windowWidth/2;
      }
/*
      if (currentlife>0 && totalBullets>0){
          gameState = PLAY; 
      } else {
        gameState = END;
      }
*/
      if (gameState == PLAY){

          handlePlayerControls();            

          spawnObstacles();

          obstacleGroup.overlap(bulletGroup,destroyEnemy);

          obstacleGroup.overlap(player,handlePlayerLife);          
    
          drawSprites();

          if (currentlife<=0 || totalBullets<=0){
              textSize(50);
              text("Game Over",windowWidth/2-100,windowHeight/2);
              gameState = END;         
         }

        if (score>= maxScore){
            textSize(50);
            text("You Win",windowWidth/2,windowHeight/2);
            gameState = END;
        }

      }

      displayScore();

  
}

function spawnObstacles(){
    //Spawn enemy spaceships
    
        if (frameCount % 50 === 0 ){
            var obstacle = createSprite(windowWidth,Math.round(random(100,windowHeight-100)),20,20);
            obstacle.setCollider("circle", -100, 0, 500);
            var r = Math.round(random(1,2));
            switch(r){
                case 1 : obstacle.addImage(enemyImage);
                break ; 
                case 2 : obstacle.addImage(meteorImage);
                break ;
                default : obstacle.addImage(enemyImage);
                break ;

            }
                
            
        obstacle.scale = 0.1;
        player.depth = obstacle.depth + 1 ;
        obstacle.velocityX = -5;
        obstacle.lifetime = 350;
        obstacleGroup.add(obstacle);
    }
}  


function destroyEnemy(obstacle,bullet){
         obstacle.destroy();
         bullet.destroy();
         score = score + 50;
}

function handlePlayerLife(obstacle,player){
         if (currentlife>0){
             currentlife = currentlife - 1;   
             livesGroup[currentlife].destroy();          
         }
         obstacle.destroy();
}

function displayScore(){
         textSize(30);
         fill("cyan");
         text("Bullets = "+totalBullets,20,40);         
         //text("Lives = "+currentlife,displayWidth-165,90);
         text("Score = "+score,20,90);
         
}

function handlePlayerControls(){
        //Add movement keys to the player
      if (keyDown("UP_ARROW")){
        player.y = player.y-7;
    }

    if (keyDown("DOWN_ARROW")){
        player.y = player.y+7;
    }

    //Set a boundary for the player
    if (player.y<0){
        player.y = 30;
    }

    if (player.y>windowHeight){
        player.y = windowHeight-30;
    }

    //Create bullet
    if (keyWentDown("space")){
        bullet = createSprite(player.x + 75,player.y-2,10,10);
        bullet.addImage(bulletImage);
        player.depth = bullet.depth + 1;
        bullet.velocityX = 10;
        bullet.scale = 0.1;
        bullet.lifetime = 250;
        bullet.setCollider("circle", 25, 10, 150);
        bulletGroup.add(bullet);
        totalBullets = totalBullets - 1 ;          
    }

}

