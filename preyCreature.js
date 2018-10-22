class preyCreature {
  constructor(x,y,startHealth) {
    this.red;
    this.green;
    this.blue;
    this.index;
    this.size=30;
    this.x = x;
    this.y = y;
    this.previousX=0;
    this.previousY=0;
    this.repulsed=0;
    this.noiseOffsetX = random(0,1000);
    this.noiseOffsetY = random(0,1000);
    this.attractionZoneSize = this.size*10;
    this.health = startHealth;
    this.dead = 0;
    this.deadCounter=90;
    this.repulsionZoneSize=this.size*2;
    this.repulsionStrength=0.02;
    this.plantRepulsionStrength=0.0005;
    this.attractionStrength=0.0001;
    this.neighbors=0;
    this.repulseTime=60;
    this.dx=0;
    this.dy=0;
    this.previousAngle=0;
    this.blink=0;
    this.plantZoneSize=this.size*10;
    this.plantStrength=.008;
  }
  
  moveAndDisplay() {
    if (this.dead ==1){
      this.deadCounter-=1;
      push();
      stroke(0);
      fill(240,240,240,90);
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

      rect(this.size/7, this.size/7, this.size/20, this.size/6);
      rect(this.size/7, -this.size/7, this.size/20, -this.size/6);
      pop();      
    }


    else{
      if (this.repulsed==0) {
        this.dx += map( noise(this.noiseOffsetX), 0, 1, -1.3, 1.3);
        this.dy += map( noise(this.noiseOffsetY), 0, 1, -1.3, 1.3);
      }
      this.healthFunc();
      this.noiseOffsetX += 0.01;
      this.noiseOffsetY += 0.01;
      this.x+=this.dx;
      this.y+=this.dy;
      if(this.x>width-this.size/2){
        this.x=width-this.size/2;
      }
      else if(this.x<0+this.size/2){
        this.x = 0+this.size/2;
      }
      if(this.y>height-this.size/2){
        this.y=height-this.size/2;
      }
      else if(this.y<0+this.size/2){
        this.y = 0+this.size/2;
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
  setPrevious(){
    this.previousX=this.x;
    this.previousY=this.y;
  }
  healthFunc() {
    this.health-=0.06;
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
      this.green=map(50-this.health,0,50,249,50);
    }
    //console.log(this.red, this.green,this.blue);
  }

  deathProcess(){
    //var tempCreature = creatures.splice(this.index,1);
    this.dead=1;
    this.deadCounter=90;
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
    fill(this.red,this.green,this.blue);
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

  attractPlant(otherPlant) { //plants must spawn certain distance apart, each have smaller attraction zone
    // see how far away we are from the other creatures
    var d = dist(this.x, this.y, otherPlant.x, otherPlant.y);
    // are we within the atraction zone?
    if (d < this.plantZoneSize/2 && this.repulsed==0 && this.health<80) { //do we keep this.repulsed in
      // move toward this creature a little bit
      var changeX = otherPlant.x - this.x;
      var changeY = otherPlant.y - this.y;

      // move 5% of the way to the new creature
      this.dx += changeX * this.plantStrength;
      this.dy += changeY * this.plantStrength;
    }
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
  repulsePlant(otherPlant) {
    // see how far away we are from the other creatures
    var d = dist(this.x, this.y, otherPlant.x, otherPlant.y);
    var changeX;
    var changeY;
    // are we within the atraction zone?
    if (this.repulsed!=0) {
      // this.dx -= changeX * this.repulsionStrength;
      // this.dy -= changeY * this.repulsionStrength;
      this.repulsed-=1;
    }
    if (d < otherPlant.size/1.5) {
      this.health=100;
      // move toward this creature a little bit
      changeX = otherPlant.x - this.x;
      changeY = otherPlant.y - this.y;

      // move 5% of the way to the new creature
      this.dx -= changeX * this.plantRepulsionStrength;
      this.dy -= changeY * this.plantRepulsionStrength;
      this.repulsed=this.repulseTime;
      //otherCreature.repulsed=this.repulseTime;
    }
  }
}