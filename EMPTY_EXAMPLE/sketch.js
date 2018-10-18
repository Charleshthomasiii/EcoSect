var creatures = [];

function setup() {
  createCanvas(1200,900,);
  for (var i = 0; i < 100; i++) {
    creatures.push( new CreatureThatAttracts(random(width), random(height)));
  }
}

function draw() {
  background(0);
  for (var i = 0; i < creatures.length; i++) {
    // visit every other creature and see if we need to attract
    for (var j = i+1; j < creatures.length; j++) {
      creatures[i].attract( creatures[j] );
      creatures[i].repulse( creatures[j] );
    }

    // display the creature
    creatures[i].moveAndDisplay();
  }
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
    // ellipse(this.x, this.y, this.attractionZoneSize, this.attractionZoneSize);

    // noFill();
    // stroke(255,0,0);
    // ellipse(this.x, this.y, 10, 10);
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
    this.attractionZoneSize = 300;
    this.repulsionZoneSize=20;
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
      this.x += dX * 0.0001;
      this.y += dY * 0.0001;
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
