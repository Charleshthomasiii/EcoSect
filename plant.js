class plant{
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.repulsed=0;
    this.attractionZoneSize = 400;
    this.health = 100;
    this.dead = 0;
    this.deadCounter=90;

    this.repulsionZoneSize=this.size*2;
    this.repulsionStrength=0.02;
    this.attractionStrength=0.0001;
  }
  // rotateCreature(){
    
  // }
  healthFunc() {
    this.health-=0.08;
    if (this.health<=0){
      this.deathProcess();
    }
  }
  deathProcess(){
    //var tempCreature = creatures.splice(this.index,1);
    this.dead=1;
    this.deadCounter=90;
    //deadCreatures.append(tempCreature);
    
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

}