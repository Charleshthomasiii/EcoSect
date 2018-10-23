var creatures = [];
var predators = [];
var deadCreatures=[];
var plants=[];
var timecount = 0;
function preload(){
  dirt = loadImage("images/dirt.jpg");
  bush= loadImage("images/bush.png")
}
function setup() {
  createCanvas(1300,600,);
  for (var i = 0; i < 20; i++) {
    creatures.push( new preyCreature(random(width), random(height),100));
  }
  // creatures.push(new predatorCreature(200,200));
  predators.push(new predatorCreature(500,500,100));
  noiseDetail(24);
}
var plantTest= new plant(50,50);
plants.push(plantTest);

function draw() {
  // tint(255, 127);
  image(dirt,0,0,);
  image(dirt,dirt.width,0);
  if (random()<.09) {
    var push=true;
    var plantX=random(50,width-50);
    var plantY=random(50,height-50);
    for(var f =0;f<plants.length;f++){
      if (dist(plantX, plantY, plants[f].x, plants[f].y)<180) {
        push=false;
      }
    }
    if (push) {
      var plantTest= new plant(plantX, plantY);
      plants.push(plantTest); 
    }
  }

  for(var w =0; w<plants.length; w++){
    plants[w].moveAndDisplay();
  }
  for (var i = 0; i < creatures.length; i++) {
    if (creatures[i].health>90 && creatures[i].dead==0) {
      if (random()<.003) {
        creatures.push( new preyCreature(creatures[i].x, creatures[i].y, 80));
      }
    }
    creatures[i].setPrevious();
    // visit every other creature and see i fwe need to attract
    for (var j = i+1; j < creatures.length; j++) {
      //creatures[i].attract( creatures[j] );
      creatures[i].repulse( creatures[j] );
      // creatures[i].attractPlant(plantTest);
      // creatures[i].repulsePlant(plantTest);
    }
    for (var j = 0; j < plants.length; j++) {
      creatures[i].attractPlant(plants[j]);
      creatures[i].repulsePlant(plants[j]);
    }
    creatures[i].moveAndDisplay();
    // for (var l )

    // display the creature
  }
  for (var i = 0; i < creatures.length; i++) {
    if (creatures[i].deadCounter<1) {
      creatures.splice(i,1);
      i++;
    }
  }
  for (var d = 0; d < plants.length; d++) {
    if (plants[d].deadCounter<1) {
      plants.splice(d,1);
      d++;
    }
  }
  for (var d = 0; d < predators.length; d++) {
    if (predators[d].health>100 && predators[d].dead!=0) {
      if (random()<.003) {
        predators[d].health=70;
        predators.push( new predatorCreature(predators[d].x, predators[d].y, 70));
      }
    }
    if (predators[d].deadCounter<1) {
      predators.splice(d,1);
      d++;
    }
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