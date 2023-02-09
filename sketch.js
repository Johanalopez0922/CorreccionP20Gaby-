var path,boy,cash,diamonds,jwellery,sword;
// agregar variables end y endImg
var end, endImg; 
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup;

//Game States
var PLAY=1;
var END=0;
var gameState=PLAY;

function preload(){
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  //Usar loadImg si necesitas agregar imágenes
  endImg =loadImage("gameOver.png");
}

function setup(){
  
createCanvas(windowWidth,windowHeight);
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 4 ;


//crear sprite boy corriendo
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
// Creé el sprite de end, para poder ubicarlo en el centro de la pantalla 
end = createSprite(width/2, height/2, 200, 50); 
end.addImage("end", endImg); 
  
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {

  if(gameState === PLAY){
  background(0);
  //adicioné visible, para controlar cuando aparece en la pantalla
  end.visible = false;  
  boy.x = World.mouseX;
  boy.scale = 0.08; 
  
  edges= createEdgeSprites();
  boy.collide(edges);
  
  if (path.y > 1000){
    path.y = height/2;
  } 

  createCash();
  createDiamonds();
  createJwellery();
  createSword();
  }
  // Adicioné estas opciones cuando el juego cambia a End 
  else if(gameState === END){
    boy.scale = 0.08;
    treasureCollection=0;
    //adicioné visible, para controlar cuando aparece en la pantalla
    end.visible = true; 
    gameState = PLAY; 
    boy.x=width/2;
    boy.y=height/2;
  }

  if (cashG.isTouching(boy)) {
    cashG.destroyEach();
    treasureCollection=treasureCollection + 50;
  }
  else if (diamondsG.isTouching(boy)) {
    diamondsG.destroyEach();
    treasureCollection=treasureCollection + 100;
    
  }else if(jwelleryG.isTouching(boy)) {
    jwelleryG.destroyEach();
    treasureCollection= treasureCollection + 150;
    
  }else{
    if(swordGroup.isTouching(boy)){
    gameState=END;       
        
    cashG.destroyEach();
    diamondsG.destroyEach();
    jwelleryG.destroyEach();
    swordGroup.destroyEach();
    
    cashG.setVelocityYEach(0);
    diamondsG.setVelocityYEach(0);
    jwelleryG.setVelocityYEach(0);
    swordGroup.setVelocityYEach(0);
    }
  }
  
  drawSprites();
  textSize(20);
  fill(255);
  text("Tesoro: "+ treasureCollection,width-150,30);
  }


function createCash() {
  if (World.frameCount % 200 == 0) {
   //Modificar las posiciones del dinero 
    var cash = createSprite(Math.round(random(windowWidth),40, 10, 10));
    cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 200;
  cashG.add(cash);
  console.log(cash.x);
  }
}

function createDiamonds() {
  if (World.frameCount % 100 == 0) {
       // Modificar las posiciones de los diamantes 

    var diamonds = createSprite(Math.round(random(windowWidth),40, 10, 10));
    diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 200;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
  if (World.frameCount % 410 == 0) {
    //Modificar las posiciones de las joyas para hacerlas aparecer en el tamaño de pantaña disponible.

    var jwellery = createSprite(Math.round(random(windowWidth),40, 10, 10));
    jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 200;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  if (World.frameCount % 530 == 0) {
    //Modificar las prosiciones de la espada para hacerla aparecer en el tamaño de pantaña disponible. 

    var sword = createSprite(Math.round(random(windowWidth),40, 10, 10));
    sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 4;
  sword.lifetime = 200;
  swordGroup.add(sword);
  }
}
