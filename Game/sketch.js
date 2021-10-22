let health;
let cash;
let round;
let playstate;
let dartmonkies = [];
let mapImage;
let bloonscount = [];

function preload(){
  mapImage = loadImage('MonkeyMeadow.png');
}

function setup() {
  frameRate(60);
  createCanvas(826, 532);
  health = 100;
  cash = 850;
  round = 0;
  playstate = 0;
}

function draw() {
  
  background(175,175,175);
  image(mapImage, 0, 0);
  drawHp();
  drawCash();
  drawRound();
  drawState();
  drawMonkies();

  drawbloons();

  changeRound();
  round1();
}
///////////////////////////////////////////////

  function keyPressed() {
    if( key == ' '){
      print('state change');
      playstate += 1;
      if(playstate > 2){
        playstate = 1;
      }
    }
  }

function mouseClicked(){
if(cash>=250){
  print("mouse pressed");
  let newmonkey = new dartmonkey();
  dartmonkies.push(newmonkey);
  cash = cash-250;
  }
}

function velocity(xVel,yVel){
    x = xVel + x;
    y = yVel + y;
}

function drawHp(){
  textSize(20);
  text('hp: ' + health, 20, 20);
  fill(255,255,255);
}
function drawCash(){
  text('$: ' + cash, 100, 20);
}
function drawRound(){
  text('Round: ' + round, 675, 20);
}
function drawState(){
  text('Speed: ' + playstate, 675, 45);
}
function drawMonkies(){
  for(let i = 0; i<dartmonkies.length; i++){
    dartmonkies[i].display();
  }
}

function drawbloons(){
  for(let i = 0; i<bloonscount.length; i++){
    if(frameCount % 30 == 0){
      bloonscount[i].display();
    }
  }
}

/////////////////////////////////////////////

class dartmonkey{
  constructor(){
    print("newmonkey");
    this.r = 115;
    this.atk = 1;
    this.spd = 0.5;
    this.p = 2;
    this.dmgtyp = 'dart';
    this.projspd = 50;
    this.x = mouseX;
    this.y = mouseY;
  }
  display(){
    fill('rgba(100, 100, 100, 0.2)');
    ellipse(this.x, this.y, this.r, this.r);
    fill(200, 110, 10);
    ellipse(this.x,this.y,28,25);
    fill(255,255,255);
  }
}
/////////////////////////////////////////////
class bloon{
   constructor(t, x, y){
     this.type = t;
     this.xPos = x;
     this.yPos = y;
   }

   display(){
     if(this.type == "red"){
        fill(255,0,0);
        ellipse(this.xPos, this.yPos, 20, 25);
        this.velocity(10,0);
        fill(255,255,255);
     }
   }
}

// function attack(){
//   for(let i = 0; i<bloonscount.length(); i++){
//     if(bloonscount[i].x <= dartmonkey.x + dartmonkey.r ||
//       bloonscount[i].x <= dartmonkey.x - dartmonkey.r ||
//       bloonscount[i].y <= dartmonkey.y + dartmonkey.r || 
//       bloonscount[i].y <= dartmonkey.y - dartmonkey.r){
      
//     }
//   }
// }

function changeRound(){
  if(playstate >= 1 && bloonscount.length == 0){
    print(bloonscount);
    round = round + 1;
  }
}

function round1(){
  if(round == 1){
   for(let j = 0; j < 5; j++){
      let red1 = new bloon("red", 0, 223);
      bloonscount.push(red1);
      print(bloonscount);
    }
  }
}




