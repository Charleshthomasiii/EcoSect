class plant{
  constructor(x,y) {
    this.x = x;
    this.y = y;
    this.repulsed=0;
    this.attractionZoneSize = 400;
    this.health = 50;
    this.dead = 0;
    this.deadCounter=90;
    this.repulsionZoneSize=this.size*2;
    this.repulsionStrength=0.02;
    this.attractionStrength=0.1;
    this.size=50;
  }
  healthFunc() {
    this.health-=0.1;
    if (this.health<=0){
      this.deathProcess();
    }
  }
  deathProcess(){
    this.dead=1;
    this.deadCounter=90;    
  }
  moveAndDisplay() {
    imageMode(CENTER);
    image(bush,this.x,this.y,this.size,this.size*.95);
    if (this.dead ==1){
      this.deadCounter-=1;
    }
    else{
      this.healthFunc();
    }
    imageMode(CORNER)
  }

}