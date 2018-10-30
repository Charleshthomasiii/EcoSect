var creatures = [];
var predators = [];
var deadCreatures=[];
var plants=[];
var timecount = 0;
var sliderY=500; //plus or minus 41 pixels

function preload(){
  dirt = loadImage("images/dirt.jpg");
  bush= loadImage("images/bush.png")
  popSound = loadSound("sounds/pop.ogg");
  soundTrack = loadSound("sounds/soundtrack.mp3");
  soundSetup();
}
function setup() {
  createCanvas(1300,600,);
  for (var i = 0; i < 20; i++) {
    creatures.push( new preyCreature(random(width), random(height),100));
  }
  // creatures.push(new predatorCreature(200,200));
  predators.push(new predatorCreature(500,500,100));
  noiseDetail(24);
  soundTrack.play();

}
var plantTest= new plant(50,50);
plants.push(plantTest);

function mousePressed() {
  var plantTest= new plant(mouseX, mouseY);
  plants.push(plantTest);
  console.log("test");
}
function draw() {
  //tint(255, 128);
  if ((keyIsDown('83') ||keyIsDown(DOWN_ARROW)) && sliderY<541) {
    sliderY+=1;
  }
  if ((keyIsDown('87')||keyIsDown(UP_ARROW)) && sliderY>459) {
    sliderY-=1;
  }
  image(dirt,0,0);
  image(dirt,dirt.width,0);
  //noTint();
  noCursor();
  imageMode(CENTER);
  image(bush,mouseX,mouseY,30,30);
  imageMode(CORNER);
  fill(150);
  rect(30,450,7,100);
  imageMode(CENTER);
  fill(20);
  ellipse(34,sliderY,20,20);
  imageMode(CORNER);
  if (random()<.09) {
    var push=true;
    var plantX=random(50,width-50);
    var plantY=random(50,height-50);
    // for(var f =0;f<plants.length;f++){
    //   if (dist(plantX, plantY, plants[f].x, plants[f].y)<180) {
    //     push=false;
    //   }
    // }
    // if (push) {
    //   var plantTest= new plant(plantX, plantY);
    //   plants.push(plantTest); 
    // }
  }

  for(var w =0; w<plants.length; w++){
    plants[w].moveAndDisplay();
  }
  for (var i = 0; i < creatures.length; i++) {
    if (creatures[i].health>90 && creatures[i].dead==0) {
      if (random()<.004 && creatures.length<130) {
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
      playEnv();
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
    if (predators[d].health>108 && predators[d].dead!=0) {
      if (random()<.0025 &&predators.length<5) {
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