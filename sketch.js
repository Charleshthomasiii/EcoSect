var creatures = [];
function setup() {
  createCanvas(1200,900,);
  for (var i = 0; i < 10; i++) {
    creatures.push( new CreatureThatAttracts(random(width), random(height)));
  }
}

function draw() {
  background(0);
  for (var i = 0; i < creatures.length; i++) {
    creatures[i].setPrevious();
    // visit every other creature and see if we need to attract
    for (var j = i+1; j < creatures.length; j++) {
      creatures[i].attract( creatures[j] );
      creatures[i].repulse( creatures[j] );
    }

    // display the creature
    creatures[i].moveAndDisplay();
  }
}

// class hunter{
//   constructor(x,y) {
//     this.x = x;
//     this.y = y;
//     this.noiseOffsetX = random(0,1000);
//     this.noiseOffsetY = random(0,1000);
//     this.attractionZoneSize = 700;
//     this.neighbors=0;
//   }
//   moveAndDisplay() {
//     this.x += map( noise(this.noiseOffsetX), 0, 1, -1.5, 1.5);
//     this.y += map( noise(this.noiseOffsetY), 0, 1, -1.5, 1.5);
//     this.noiseOffsetX += 0.01;
//     this.noiseOffsetY += 0.01;
//     if(this.x>width){
//       this.x=0
//     }
//     else if(this.x<0){
//       this.x = width
//     }
//     if(this.y>height){
//       this.y=0
//     }
//     else if(this.y<0){
//       this.y = height
//     }


//     // draw the creature
//     fill(255);
//     noStroke();
//     ellipse(this.x, this.y, 10, 10);

//     // draw the 'attraction zone' for the creature
//     noFill();
//     stroke(0,255,0);
//     ellipse(this.x, this.y, this.attractionZoneSize, this.attractionZoneSize);

//     noFill();
//     stroke(255,0,0);
//     ellipse(this.x, this.y, 10, 10);
//     console.log("test");
//     ellipse(this.x, this.y, this.repulsionZoneSize, this.repulsionZoneSize);
//   }

//   attract(otherCreature) {
//     // see how far away we are from the other creatures
//     var d = dist(this.x, this.y, otherCreature.x, otherCreature.y);
//     // are we within the atraction zone?
//     if (d < this.attractionZoneSize/2) {
//       // move toward this creature a little bit
//       var dX = otherCreature.x - this.x;
//       var dY = otherCreature.y - this.y;

//       // move 5% of the way to the new creature
//       this.x += dX * 0.0001;
//       this.y += dY * 0.0001;
//     }
//   }
// }


class CreatureThatAttracts {

  constructor(x,y) {
    this.x = x;
    this.y = y; 
    this.previousX=0;
    this.previousY=0;
    this.repulsed=0;
    this.noiseOffsetX = random(0,1000);
    this.noiseOffsetY = random(0,1000);
    this.attractionZoneSize = 400;
    this.repulsionZoneSize=140;
    this.repulsionStrength=0.01;
    this.attractionStrength=0.001;
    this.neighbors=0;
    this.repulseTime=60;
    this.dx=0;
    this.dy=0;
    this.previousAngle=0;
  }
  setPrevious(){
    this.previousX=this.x;
    this.previousY=this.y;
  }
  moveAndDisplay() {
    if (this.repulsed==0) {
      this.dx += map( noise(this.noiseOffsetX), 0, 1, -1, 1);
      this.dy += map( noise(this.noiseOffsetY), 0, 1, -1, 1);
    }
    this.noiseOffsetX += 0.01;
    this.noiseOffsetY += 0.01;
    this.x+=this.dx;
    this.y+=this.dy;
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
    ellipse(0, 0, 100, 100);  
    fill(0);
    ellipse(15,-20,20,20);
    ellipse(15,20,20,20);
    fill(229, 125, 34);
    // ellipse(50,50,30,30);
    pop();
  }
  rotateCreature(){
    push();
    fill("#581845");
    rectMode(CENTER);
    var xlen=(this.previousX-this.x);
    var ylen=(this.y-this.previousY);
    var result=ylen/xlen;
    var ang=Math.atan(result);
    ang=ang+3.14159;
    if (this.previousX<this.x) {
      ang=ang+3.141592;
    }
    var c = -((ang));


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
    ellipse(0, 0, 70, 70);  
    fill(0);
    ellipse(12,-12,17,17);
    ellipse(12,12,17,17);
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
      var change = otherCreature.x - this.x;
      var change = otherCreature.y - this.y;

      // move 5% of the way to the new creature
      this.dx += change * this.attractionStrength;
      this.dy += change * this.attractionStrength;
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
