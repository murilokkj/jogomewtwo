var mew,mewsentada,mewabaixado;
var chao,chao_img;
var chaoinvisivel;
var obstaculo;
var bordas;
var pontuacao = 0;
var gameover,gameover_img;
var restart,restart_img;
var die;
var checkpoint;
var jump;
var fundo,fundoimg;

var JOGAR = 0;
var FIM = 1;

var mododejogo = JOGAR;

function preload(){
// pre carrega as imagens
  mewimg = loadAnimation("images/mewtwocorrendo.png","images/mewtwocorrendo2.png");
  mewabaixado = loadAnimation("images/mewtwosentada.png","images/mewtwosentada2.png");
  chao_img = loadImage("images/chao.png");
  gameover_img = loadImage("images/gameOver.png");
  restart_img = loadImage("images/restart.png");
  die = loadSound("sound/die.mp3");
  checkpoint = loadSound("sound/checkPoint.mp3");
  fundoimg = loadImage("images/fundo.png");
  jump = loadSound("sound/jump.mp3");
  obstaculo = loadImage("images/maluobstaculo.png");
}

function setup(){
 createCanvas(600,200);

  fundo = createSprite(0,0, 10,10);
  fundo.addImage("fundo",fundoimg);
  //chao invisivel para corrigir a chao
  chaoinvisivel = createSprite(300,195,600,20);
  chaoinvisivel.visible = false;
  
  //cria um sprite do trex
  mew = createSprite(50,100,20,20);
  //adiciona a imagem dentro do sprite
  mew.addAnimation("running",mewimg);
  mew.addAnimation("gameover",mewabaixado);
  mew.addAnimation("abaixado",mewabaixado);
  mew.scale = 0.5;
  mew.debug = true;
  mew.setCollider("rectangle",0,0,75,50);
  
  bordas = createEdgeSprites();
  
  chao = createSprite(300,190,600,35);
  chao.x = chao.width /2;
  
  chao.addImage("chao",chao_img);
  
  gameover = createSprite(300,100,10,10);
  gameover.addImage(gameover_img);
  gameover.scale = 0.7
  gameover.visible = false;
  
  restart = createSprite(300,125,10,10);
  restart.addImage(restart_img);
  restart.scale = 0.6;
  restart.visible = false;
  
}

function draw(){
  background("white");
  

  
  text("Pontuação: " + pontuacao,490,20);
  
  if (mododejogo === JOGAR){
     
    
    //comando para pular só uma vez
    if(keyDown("space") && mew.isTouching(chao)){
      mew.velocityY = -12;
     
      jump.play();
      
    }
    
    //gravidade
    mew.velocityY =  mew.velocityY + 0.8;
    
    //o dino colide com as bordas da tela
    mew.collide(edges);
    
    //chao movendo
    chao.velocityX = -(10 + pontuacao /100);    
  
    if(chao.x < 0){
     chao.x = chao.width /2
    }
  
     pontuacao = pontuacao + Math.round(frameRate() /60);
    
     //if(pontuacao %100 === 0 && pontuacao >0){
       //checkpoint.play();
     //}
    
    
    if(mew.isTouching(obstaculo)){
      mododejogo = FIM;
      die.play();
    }
    
    if(keyDown(DOWN_ARROW)){
      mew.changeAnimation("abaixado");
    }
    else{
      mew.changeAnimation("running");
    }
  }
  else if (mododejogo === FIM){
    
    chao.velocityX = 0;

    mew.velocityY = 0;
    
    mew.changeAnimation("gameover");
    
    restart.visible = true;
    gameover.visible = true;
    
    if(mousePressedOver(restart)){
      
      recomecar();
    }
  }
  
  drawSprites();
}

function criarobstaculo(){

  
  if (frameCount %60 === 0){
    obstaculo = createSprite(700,175,10,10);
    obstaculo.velocityX = -(10 + pontuacao /100);
    
    obstaculo.scale = 0.5;
 
    obstaculo.lifetime = 100;  
   
  
  }
 
  }
function recomecar(){
  mododejogo = JOGAR;
  
  pontuacao = 0;
  
  restart.visible = false;
  gameover.visible = false;
}