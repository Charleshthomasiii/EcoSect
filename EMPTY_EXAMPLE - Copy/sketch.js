var creatures = [];
var angle = 0.0;
var jitter = 0.0;
function setup() {
  createCanvas(1200,900,);

}
xPos=500;
yPos=500;
function draw() {

  background(12, 89, 8);
  fill(229, 125, 34);
  ellipse(50,50,30,30);
  rectMode(CENTER);
  // during even-numbered seconds (0, 2, 4, 6...) add jitter to
  // the rotation
  jitter+=.01;
  //increase the angle value using the most recent jitter value
  angle = radians(30);
  if (xlen<0) {
      xlen*=-1;
  }
  if (ylen<0) {
    ylen*=-1;
  }
  var xlen=mouseX-xPos;
  var ylen=mouseY-yPos;
  var result=ylen/xlen;

  var ang=Math.atan(result);
  console.log(ang);
  //use cosine to get a smooth CW and CCW motion when not jittering
  var c = ((result));
  //move the shape to the center of the canvas
  translate(xPos, yPos);
  //apply the final rotation
  rotate(c);
  rect(0, 0, 250, 180);  
  jitter=0;
}

class hunter{
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.noiseOffsetX = random(0,1000);
    this.noiseOffsetY = random(0,1000);
    this.attractionZoneSize = 700;
    this.neighbors=0;
  }
  moveAndDisplay() {
    this.x += map( noise(this.noiseOffsetX), 0, 1, -1.5, 1.5);
    this.y += map( noise(this.noiseOffsetY), 0, 1, -1.5, 1.5);
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
    if(this.x>width){
      this.x=0
    }
    else if(this.x<0){
      this.x = width
    }
    if(this.y>height){
      this.y=0
    }
    else if(this.y<0){
      this.y = height
    }


    // draw the creature
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 10, 10);

    // draw the 'attraction zone' for the creature
    noFill();
    stroke(0,255,0);
    ellipse(this.x, this.y, this.attractionZoneSize, this.attractionZoneSize);

    noFill();
    stroke(255,0,0);
    ellipse(this.x, this.y, 10, 10);
    console.log("test");
    ellipse(this.x, this.y, this.repulsionZoneSize, this.repulsionZoneSize);
  }

  attract(otherCreature) {
    // see how far away we are from the other creatures
    var d = dist(this.x, this.y, otherCreature.x, otherCreature.y);
    // are we within the atraction zone?
    if (d < this.attractionZoneSize/2) {
      // move toward this creature a little bit
      var dX = otherCreature.x - this.x;
      var dY = otherCreature.y - this.y;

      // move 5% of the way to the new creature
      this.x += dX * 0.0001;
      this.y += dY * 0.0001;
    }
  }
}



class CreatureThatAttracts {

  constructor(x,y) {
    this.x = x;
    this.y = y; 
    this.noiseOffsetX = random(0,1000);
    this.noiseOffsetY = random(0,1000);
    this.attractionZoneSize = 200;
    this.repulsionZoneSize=50;
    this.extraRepulsion=10;
    this.neighbors=0;
  }

  moveAndDisplay() {
    this.x += map( noise(this.noiseOffsetX), 0, 1, -.5, .5);
    this.y += map( noise(this.noiseOffsetY), 0, 1, -.5, .5);
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
    if(this.x>width){
      this.x=0
    }
    else if(this.x<0){
      this.x = width
    }
    if(this.y>height){
      this.y=0
    }
    else if(this.y<0){
      this.y = height
    }


    // draw the creature
    fill(255);
    noStroke();
    ellipse(this.x, this.y, 10, 10);

    // draw the 'attraction zone' for the creature
    noFill();
    stroke(0,255,0);
    // ellipse(this.x, this.y, this.attractionZoneSize, this.attractionZoneSize);

    noFill();
    stroke(255,0,0);
    ellipse(this.x, this.y, 10, 10);
     // ellipse(this.x, this.y, this.repulsionZoneSize, this.repulsionZoneSize);
  }

  attract(otherCreature) {
    // see how far away we are from the other creatures
    var d = dist(this.x, this.y, otherCreature.x, otherCreature.y);
    // are we within the atraction zone?
    if (d < this.attractionZoneSize/2) {
      // move toward this creature a little bit
      var dX = otherCreature.x - this.x;
      var dY = otherCreature.y - this.y;

      // move 5% of the way to the new creature
      this.x += dX * 0.001;
      this.y += dY * 0.001;
      this.neighbors++;
    }

  }
  repulse(otherCreature) {
    // see how far away we are from the other creatures
    var d = dist(this.x, this.y, otherCreature.x, otherCreature.y);
    // are we within the atraction zone?
    if (d < this.repulsionZoneSize/2) {
      // move toward this creature a little bit
      var dX = otherCreature.x - this.x;
      var dY = otherCreature.y - this.y;

      // move 5% of the way to the new creature
      this.x -= dX * 0.02;
      this.y -= dY * 0.02;
      this.neighbors++;
    }
  }
}
