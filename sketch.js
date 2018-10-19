var creatures = [];
var predators = [];
var deadCreatures=[];
var timecount = 0;
function preload(){
  dirt = loadImage("images/dirt.jpg");
  bush= loadImage("images/bush.png")
}
function setup() {
  createCanvas(1300,600,);
  for (var i = 0; i < 40; i++) {
    creatures.push( new preyCreature(random(width), random(height)));
  }
  // creatures.push(new predatorCreature(200,200));
  predators.push(new predatorCreature(500,500));
  noiseDetail(24);
}

function draw() {

  // tint(255, 127);
  image(dirt,0,0,);
  image(dirt,dirt.width,0)
  image(bush,0,0,90,70);
  for (var i = 0; i < creatures.length; i++) {
    creatures[i].setPrevious();
    // visit every other creature and see i fwe need to attract
    for (var j = i+1; j < creatures.length; j++) {
      creatures[i].attract( creatures[j] );
      creatures[i].repulse( creatures[j] );
    }
    // for (var l )

    // display the creature
    creatures[i].moveAndDisplay();
  }
  for( var r=0; r<predators.length; r++){
    predators[r].setPrevious();
    for (var j = 0; j < creatures.length; j++) {
      predators[r].attract( creatures[j] );
      predators[r].eat( creatures[j],j );
    }
    predators[r].moveAndDisplay();
    predators[r].preyDecision = [];
  }
}

class preyCreature {
  constructor(x,y) {
    this.red;
    this.green;
    this.blue;
    this.index;
    this.size=40;
    this.x = x;
    this.y = y;
    this.previousX=0;
    this.previousY=0;
    this.repulsed=0;
    this.noiseOffsetX = random(0,1000);
    this.noiseOffsetY = random(0,1000);
    this.attractionZoneSize = 400;
    this.health = 100;
    this.dead = 0;
    this.deadcounter = 120;

    this.repulsionZoneSize=this.size*2;
    this.repulsionStrength=0.02;
    this.attractionStrength=0.0001;
    this.neighbors=0;
    this.repulseTime=60;
    this.dx=0;
    this.dy=0;
    this.previousAngle=0;
    this.blink=0;
  }
  setPrevious(){
    this.previousX=this.x;
    this.previousY=this.y;
  }
  healthFunc() {
    this.health-=0.1;
    if (this.health<=0){
      this.deathProcess();
    }
    if (this.health>50) {
      this.red=map(this.health,50,100,249,77);
      this.blue=54;
      this.green=249;
    }
    else{
      this.red=249;
      this.blue=54;
      this.green=map(50-this.health,0,50,249,100);
    }
    console.log(this.red, this.green,this.blue);
  }
  moveAndDisplay() {
    if (this.dead ==1){
      push();
      fill(200,200,200);
      rectMode(CENTER);
      var xlen=(this.previousX-this.x);
      var ylen=(this.y-this.previousY);
      var result=ylen/xlen;
      var ang=Math.atan(result);
      ang=ang+3.14159;
      if (this.previousX<this.x) {
        ang=ang+3.14159;
      }
      var c = -ang;
  
  
      translate(this.x, this.y);
      // console.log(c)
      //apply the final rotation

      rotate(this.previousAngle);
  
      ellipse(0, 0, this.size, this.size);
      fill(0);
      if (this.blink==0) {
        if(random()<.0005){
          this.blink=20;
        }
        else{
          ellipse(this.size/7,-this.size/7,this.size/5,this.size/5);
          ellipse(this.size/7,this.size/7,this.size/5,this.size/5);
        }
      }
      if (this.blink>0) {
        this.blink-=1;
        rect(this.size/7, this.size/7, this.size/20, this.size/6);
        rect(this.size/7, -this.size/7, this.size/20, -this.size/6);
      }
  
      fill(229, 125, 34);
      // ellipse(50,50,30,30);
      pop();

  
      
    }
    else{
      if (this.repulsed==0) {
        this.dx += map( noise(this.noiseOffsetX), 0, 1, -1, 1);
        this.dy += map( noise(this.noiseOffsetY), 0, 1, -1, 1);
      }
      this.healthFunc();
      this.noiseOffsetX += 0.01;
      this.noiseOffsetY += 0.01;
      this.x+=this.dx;
      this.y+=this.dy;
      if(this.x>width){
        this.x=width
      }
      else if(this.x<0){
        this.x = 0
      }
      if(this.y>height){
        this.y=height
      }
      else if(this.y<0){
        this.y = 0
      }
  
      // draw the creature
      fill(255);
      noStroke();
      this.rotateCreature();
      // draw the 'attraction zone' for the creature
       // ellipse(this.x, this.y, this.repulsionZoneSize, this.repulsionZoneSize);
       this.dx=0;
       this.dy=0;
    }
    
    
  }
  deathProcess(){
    //var tempCreature = creatures.splice(this.index,1);
    tempCreature.dead=1;
    //deadCreatures.append(tempCreature);
    
  }
  rotateCreatureMouse(){
    push();
    fill("#581845");
    rectMode(CENTER);
    var mouse_out_x=mouseX;
    var mouse_out_y=mouseY;
    var xlen=mouseX-this.x;
    var ylen=this.y-mouseY;
    var result=ylen/xlen;
    var ang=Math.atan(result);
    if (mouseX<this.x) {
      ang=ang+3.141592;
    }
    var c = -((ang));
    translate(this.x, this.y);
    //apply the final rotation
    rotate(c);
    ellipse(0, 0, this.size, this.size);
    fill(0);
    ellipse(this.size/5.2,-this.size/5,this.size/5,this.size/5);
    ellipse(this.size/5.2,-this.size/5,this.size/5,this.size/5);
    fill(229, 125, 34);
    // ellipse(50,50,30,30);
    pop();
  }
  rotateCreature(){
    push();
    fill(158,84,129);
    rectMode(CENTER);
    var xlen=(this.previousX-this.x);
    var ylen=(this.y-this.previousY);
    var result=ylen/xlen;
    var ang=Math.atan(result);
    ang=ang+3.14159;
    if (this.previousX<this.x) {
      ang=ang+3.14159;
    }
    var c = -ang;


    translate(this.x, this.y);
    // console.log(c)
    //apply the final rotation

    if (this.repulsed==0) {
      rotate(c);
      this.previousAngle=c;
    }
    else{
      rotate(this.previousAngle);
    }

    ellipse(0, 0, this.size, this.size);
    fill(0);
    if (this.blink==0) {
      if(random()<.0005){
        this.blink=20;
      }
      else{
        ellipse(this.size/7,-this.size/7,this.size/5,this.size/5);
        ellipse(this.size/7,this.size/7,this.size/5,this.size/5);
      }
    }
    if (this.blink>0) {
      this.blink-=1;
      rect(this.size/7, this.size/7, this.size/20, this.size/6);
      rect(this.size/7, -this.size/7, this.size/20, -this.size/6);
    }

    fill(229, 125, 34);
    // ellipse(50,50,30,30);
    pop();
  }

  attract(otherCreature) {
    // see how far away we are from the other creatures
    var d = dist(this.x, this.y, otherCreature.x, otherCreature.y);
    // are we within the atraction zone?
    if (d < this.attractionZoneSize/2 && this.repulsed==0) {
      // move toward this creature a little bit
      var changeX = otherCreature.x - this.x;
      var changeY = otherCreature.y - this.y;

      // move 5% of the way to the new creature
      this.dx += changeX * this.attractionStrength;
      this.dy += changeY * this.attractionStrength;
      this.neighbors++;
    }

  }
  repulse(otherCreature) {
    // see how far away we are from the other creatures
    var d = dist(this.x, this.y, otherCreature.x, otherCreature.y);
    var changeX;
    var changeY;
    // are we within the atraction zone?
    if (this.repulsed!=0) {
      // this.dx -= changeX * this.repulsionStrength;
      // this.dy -= changeY * this.repulsionStrength;
      this.repulsed-=1;
    }
    if (d < this.repulsionZoneSize/2) {
      // move toward this creature a little bit
      changeX = otherCreature.x - this.x;
      changeY = otherCreature.y - this.y;

      // move 5% of the way to the new creature
      this.dx -= changeX * this.repulsionStrength;
      this.dy -= changeY * this.repulsionStrength;
      this.repulsed=this.repulseTime;
      //otherCreature.repulsed=this.repulseTime;
    }
  }
}
class predatorCreature {
  constructor(x,y) {
    this.size=60;
    this.x = x;
    this.y = y;
    this.previousX=0;
    this.previousY=0;
    this.repulsed=0;
    this.noiseOffsetX = random(0,1000);
    this.noiseOffsetY = random(0,1000);
    this.attractionZoneSize = 1000;
    this.preyDecision=[];
    this.index;
    //pick the nearest prey, and chase after it

    this.eatZoneSize=this.size*2;
    this.eatStrength=0.0;
    this.attractionStrength=0.01;
    this.repulseTime=60;
    this.dx=0;
    this.dy=0;
    this.previousAngle=0;
    this.blink=0;
  }
  setPrevious(){
    this.previousX=this.x;
    this.previousY=this.y;
  }
  moveAndDisplay() {
    // if (this.repulsed==0) {
    //   this.dx += map( noise(this.noiseOffsetX), 0, 1, -.5, .5);
    //   this.dy += map( noise(this.noiseOffsetY), 0, 1, -.5, .5);
    // }
    var min=50000;
    var chosen;
    for (var i = 0; i<this.preyDecision.length; i++) {
      if (this.preyDecision[i][0]<min) {
        min=this.preyDecision[i][0];
        chosen=i; //picking the closest prey;
      }
    }
    var changeX=0;
    var changeY=0;
    if (this.preyDecision.length!=0) {
      changeX=this.preyDecision[chosen][1];
      changeY=this.preyDecision[chosen][2];
    }
    this.dx += changeX * this.attractionStrength;
    this.dy += changeY * this.attractionStrength;
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
    this.x+=this.dx;
    this.y+=this.dy;
    if(this.x>width){
      this.x=width
    }
    else if(this.x<0){
      this.x = 0
    }
    if(this.y>height){
      this.y=height
    }
    else if(this.y<0){
      this.y = 0
    }

    // draw the creature
    fill(255);
    noStroke();
    this.rotateCreature();
    // draw the 'attraction zone' for the creature
     // ellipse(this.x, this.y, this.repulsionZoneSize, this.repulsionZoneSize);
     this.dx=0;
     this.dy=0;
  }
  rotateCreatureMouse(){
    push();
    fill("#581845");
    rectMode(CENTER);
    var mouse_out_x=mouseX;
    var mouse_out_y=mouseY;
    var xlen=mouseX-this.x;
    var ylen=this.y-mouseY;
    var result=ylen/xlen;
    var ang=Math.atan(result);
    if (mouseX<this.x) {
      ang=ang+3.141592;
    }
    var c = -((ang));
    translate(this.x, this.y);
    // console.log(c)
    //apply the final rotation
    rotate(c);
    ellipse(0, 0, this.size, this.size);
    fill(0);
    ellipse(this.size/5.2,-this.size/5,this.size/5,this.size/5);
    ellipse(this.size/5.2,-this.size/5,this.size/5,this.size/5);
    fill(229, 125, 34);
    // ellipse(50,50,30,30);
    pop();
  }
  rotateCreature(){
    push();
    fill(100,24,40);
    var xlen=(this.previousX-this.x);
    var ylen=(this.y-this.previousY);
    var result=ylen/xlen;
    var ang=Math.atan(result);
    ang=ang+3.14159;
    if (this.previousX<this.x) {
      ang=ang+3.14159;
    }
    var c = -ang;


    translate(this.x, this.y);
    // console.log(c)
    //apply the final rotation
    rotate(c);
    // if (this.repulsed==0) {
    //   rotate(c);
    //   this.previousAngle=c;
    // }
    // else{
    //   rotate(this.previousAngle);
    // }

    ellipse(0, 0, this.size, this.size);
    fill(0);
    if (this.blink==0) {
      if(random()<.0005){
        this.blink=20;
      }
      else{
        ellipse(this.size/7,-this.size/7,this.size/5,this.size/5);
        ellipse(this.size/7,this.size/7,this.size/5,this.size/5);
      }
    }
    if (this.blink>0) {
      this.blink-=1;
      rect(this.size/7, this.size/7, this.size/20, this.size/6);
      rect(this.size/7, -this.size/7, this.size/20, -this.size/6);
    }

    fill(229, 125, 34);
    // ellipse(50,50,30,30);
    pop();
  }

  attract(otherCreature) {
    // see how far away we are from the other creatures
    var d = dist(this.x, this.y, otherCreature.x, otherCreature.y);
    // are we within the atraction zone?

    if (d < this.attractionZoneSize/2) {
      // move toward this creature a little bit
      var changeX = otherCreature.x - this.x;
      var changeY = otherCreature.y - this.y;
      this.preyDecision.push([d,changeX,changeY]);
      // move 5% of the way to the new creature
      // this.dx += changeX * this.attractionStrength;
      // this.dy += changeY * this.attractionStrength;
    }

  }
  eat(otherCreature,index) {
    var d = dist(this.x, this.y, otherCreature.x, otherCreature.y);
    if (d < this.eatZoneSize/2) {
      creatures.splice(index,1);
    }
  }
}
