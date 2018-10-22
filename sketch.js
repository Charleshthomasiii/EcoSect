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
  for (var i = 0; i < 50; i++) {
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