let captureSource;
let capture;
let previousFrame = [];
let difference2;
let difference1;
let difference3;
let difference4;
let numFrames;
let totalDifference;
let reds = [];

let x = 0;


function setup() {
  createCanvas(640, 320);
  captureSource = createCapture(VIDEO);
  captureSource.size(640, 480);
  captureSource.hide();
  capture = createGraphics(640,320);
  capture.pixelDensity(1);
  
  for (let i = 0; i < 640 * 480 * 4; i++) {
    previousFrame[i] = 0;
  }
  numFrames = 0;
  totalDifference = 0;
  textFont("Roboto Mono");
  textStyle(ITALIC);
  frameRate(15);
  
  let newred = new redball("red", 0, 10);
  reds.push(newred);
}

function draw() {
  capture.push();
  capture.translate(320, 240);
  capture.scale(1.667);
  capture.translate(-320, -312);
  capture.noFill();
  capture.stroke(255, 0, 0);
  capture.rect(128, 168, 384, 192);
  
  capture.push();
  capture.scale(-1,1);
  capture.image(captureSource, -640, 0, 640, 480);
  capture.pop();
  capture.pop();
  background(0);
  
  capture.loadPixels();
  //image(capture,0,0);
  noStroke();
  difference1 = 0;
  difference2 = 0;
  difference3 = 0;
  difference4 = 0;
  
  for (let y = 80; y < 140; y += 2) {
    for (let x = capture.width/4 * 3; x < capture.width; x += 2) {
      let i = (x + capture.width * y) * 4;
      let diffR = abs(previousFrame[i] - capture.pixels[i]);
      let diffG = abs(previousFrame[i + 1] - capture.pixels[i + 1]);
      let diffB = abs(previousFrame[i + 2] - capture.pixels[i + 2]);
      let threshold = 100;

      if (diffR + diffB + diffG > threshold) {
        difference1++;
        fill(255, 0, 0);
        ellipse(x, y, 4, 4);
      }
    }
  }

  for (let y = 140; y < 200; y += 2) {
    for (let x = capture.width/4 *3; x < capture.width; x += 2) {
      let i = (x + capture.width * y) * 4;
      let diffR = abs(previousFrame[i] - capture.pixels[i]);
      let diffG = abs(previousFrame[i + 1] - capture.pixels[i + 1]);
      let diffB = abs(previousFrame[i + 2] - capture.pixels[i + 2]);
      let threshold = 100;

      if (diffR + diffB + diffG > threshold) {
        difference2++;
        fill(0, 255, 0);
        ellipse(x, y, 4, 4);
      }
    }
  }
  
    for (let y = 200; y < 260; y += 2) {
    for (let x = capture.width/4*3; x < capture.width; x += 2) {
      let i = (x + capture.width * y) * 4;
      let diffR = abs(previousFrame[i] - capture.pixels[i]);
      let diffG = abs(previousFrame[i + 1] - capture.pixels[i + 1]);
      let diffB = abs(previousFrame[i + 2] - capture.pixels[i + 2]);
      let threshold = 100;

      if (diffR + diffB + diffG > threshold) {
        difference3++;
        fill(0, 0, 255);
        ellipse(x, y, 4, 4);
      }
    }
  }
  
    for (let y = 260; y < 320; y += 2) {
    for (let x = capture.width/4*3; x < capture.width; x += 2) {
      let i = (x + capture.width * y) * 4;
      let diffR = abs(previousFrame[i] - capture.pixels[i]);
      let diffG = abs(previousFrame[i + 1] - capture.pixels[i + 1]);
      let diffB = abs(previousFrame[i + 2] - capture.pixels[i + 2]);
      let threshold = 100;

      if (diffR + diffB + diffG > threshold) {
        difference4++;
        fill(255, 255, 0);
        ellipse(x, y, 4, 4);
      }
    }
  }
  e2qw2();
  
  
  
  fill(255);
  textAlign(CENTER);
  textSize(20);
  text(difference1, 160, 20);
  text(difference2, 480, 20);
  text(difference3, 160, 40);
  text(difference4, 480, 40)
  previousFrame = capture.pixels;
  
  for(let i=0; i<reds.length; i++){
    reds[i].display();
  }
}

////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////////////////////

class redball{
  constructor(typ, x, v){
    redball.type = typ;
    redball.xPos = x;
    redball.velocity = v;
  }
  
  display(){
    fill(255,255,255);
    if(redball.type == "red"){
      ellipse(redball.xPos, 110, 20, 20);
    }
    if(redball.type == "green"){
      ellipse(redball.xPos, 170, 20, 20);
    }
    if(redball.type == "blue"){
      ellipse(redball.xPos, 230, 20, 20);
    }
    if(redball.type == "yellow"){
      ellipse(redball.xPos, 290, 20, 20);
    }
    if(redball.type == "rest"){
      fill(0, 0, 0);
      ellipse(redball.xPos, 0, 20, 20);
      fill(255, 255, 255);
      }
    redball.xPos = redball.xPos + redball.velocity;
  }
}

function e2qw2(){
  for(let v = capture.width / 4 * 3; v <= capture.width;  v=v+15){
    for(let h = 0; h<reds.length; h++ ){
      if(reds[h].xPos >= 630 || reds[h].xPos == v+5 || reds[h].xPos == v-5){
        if((reds[h].type == "red" && difference1 > difference2 && difference1 > difference3 && difference1 > difference4) ||
          (reds[h].type == "blue" && difference2 > difference1 && difference2 > difference3 && difference2 > difference4) ||
          (reds[h].type == "green" && difference3 > difference2 && difference3 > difference1 && difference3 > difference4) ||
          (reds[h].type == "red" && difference4 > difference2 && difference4 > difference3 && difference4 > difference1)){
          reds[h] = new redball(rest, reds[h].xPos, 10);
          print("detect")
        }
      }
    }
  }
}