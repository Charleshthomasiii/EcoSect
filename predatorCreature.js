class predatorCreature {
  constructor(x,y,startHealth) {
    this.moveSpeed;
    this.size=60;
    this.x = x;
    this.y = y;
    this.health=startHealth;
    this.previousX=0;
    this.previousY=0;
    this.repulsed=0;
    this.noiseOffsetX = random(0,10000);
    this.noiseOffsetY = random(0,10000);
    this.attractionZoneSize = 350;
    this.preyDecision=[];
    this.index;
    //pick the nearest prey, and chase after it
    this.red;
    this.green;
    this.blue;
    this.eatZoneSize=this.size*2;
    this.attractionStrength=0.014;
    this.repulseTime=60;
    this.dx=0;
    this.dy=0;
    this.previousAngle=0;
    this.blink=0;
    this.eatingCounter=0;
    this.deadCounter;
  }
  setPrevious(){
    this.previousX=this.x;
    this.previousY=this.y;
  }
  deathProcess(){
    //var tempCreature = creatures.splice(this.index,1);
    this.dead=1;
    this.deadCounter=90;
    //deadCreatures.append(tempCreature);
  }
  healthFunc() {
    this.health-=0.06;
    if (this.health<=0){
      this.deathProcess();
    }
    if (this.health>50) {
      this.red=map(this.health,50,100,249,77);
      this.blue=180;
      this.green=50;
    }
    else{
      this.red=249;
      this.blue=180;
      this.green=map(50-this.health,0,50,50,0);
    }
    //console.log(this.red, this.green,this.blue);
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
      this.healthFunc();
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
      this.dx += map( noise(this.noiseOffsetX), 0, 1, -1, 1);
      this.dy += map( noise(this.noiseOffsetY), 0, 1, -1, 1);
      this.moveSpeed=map(sliderY,459,541,.3,10);
      this.dx/=this.moveSpeed; 
      this.dy/=this.moveSpeed;
      this.noiseOffsetX += 0.001;
      this.noiseOffsetY += 0.001;
      if (this.eatingCounter>0) {
        this.dx=0;
        this.dy=0;
        this.eatingCounter-=1;
      }
      this.x+=this.dx;
      this.y+=this.dy;
      // if(this.x>width){
      //   this.x=width
      // }
      // else if(this.x<0){
      //   this.x = 0
      // }
      // if(this.y>height){
      //   this.y=height
      // }
      // else if(this.y<0){
      //   this.y = 0
      // }
      if(this.x>width){
        this.x=0
      }
      else if(this.x<0){
        this.x = width;
      }
      if(this.y>height){
        this.y=0
      }
      else if(this.y<0){
        this.y = height;
      }

      // draw the creature
      this.rotateCreature();
      // draw the 'attraction zone' for the creature
       // ellipse(this.x, this.y, this.repulsionZoneSize, this.repulsionZoneSize);
       this.dx=0;
       this.dy=0;
    }
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
    fill(this.red,this.green,this.blue);
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
    //rotate(c);
    if (this.eatingCounter==0) {
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
    if (this.eatingCounter>0) {
      fill(0);
      ellipse(this.size/2.7,0,this.size/6,this.size/4);
    }
    if (this.blink>0) {
      this.blink-=1;
      rect(this.size/7, this.size/7, this.size/20, this.size/6);
      rect(this.size/7, -this.size/7, this.size/20, -this.size/6);
    }
    // ellipse(50,50,30,30);
    pop();
  }

  attract(otherCreature) {
    // see how far away we are from the other creatures
    var d = dist(this.x, this.y, otherCreature.x, otherCreature.y);
    // are we within the atraction zone?

    if (d < this.attractionZoneSize/2 && otherCreature.dead!=1) {
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
    if (d < (otherCreature.size+this.size)/2 && otherCreature.dead==0) {
      otherCreature.deathProcess(this);
      this.eatingCounter=20;
      //creatures.splice(index,1);
      this.health+=10;
    }
  }
}