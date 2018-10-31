var creatures = [];
var predators = [];
var deadCreatures=[];
var plants=[];
var timecount = 0;
var sliderY=541; //plus or minus 41 pixels
var state=0;
function preload(){
  dirt = loadImage("images/dirt.jpg");
  bush= loadImage("images/bush.png")
  popSound = loadSound("sounds/pop.ogg");
  soundTrack = loadSound("sounds/soundtrack.mp3");
  soundSetup();
}
function setup(){
  console.log("testtest");
  createCanvas(1300,600,);
  for (var i = 0; i < 20; i++) {
    creatures.push( new preyCreature(random(width), random(height),100));
  }
  // creatures.push(new predatorCreature(200,200));
  predators.push(new predatorCreature(500,500,100));
  noiseDetail(24);
  soundTrack.play();

}
function mousePressed() {
  var plantTest= new plant(mouseX, mouseY);
  plants.push(plantTest);
  console.log("test");
}
function draw() {
  console.log("testing");
  //tint(255, 128);
  // if ((keyIsDown('83') ||keyIsDown(DOWN_ARROW)) && sliderY<541) {
  //   sliderY+=1;
  // }
  // if ((keyIsDown('87')||keyIsDown(UP_ARROW)) && sliderY>459) {
  //   sliderY-=1;
  // }
  sliderY-=.001*(sliderY-459);
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
      creatures[i].repulse( creatures[j] );
      // creatures[i].attractPlant(plantTest);
      // creatures[i].repulsePlant(plantTest);
    }
    for(var w =0; w<predators.length;w++){
        creatures[i].repulsePredator(predators[w]);
        console.log("goteem");
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
      //playEnv();
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
      if (random()<.002 &&predators.length<5 ) {
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
var creatures = [];
var predators = [];
var deadCreatures=[];
var plants=[];
var timecount = 0;
var sliderY=500; //plus or minus 41 pixels
var pause = 0;
var stop = 1;
var gameend = 0;
var gigifont;
var milliseconds = 0;
var inactivetime = 0;
var activetime = 0;
var activetimeinseconds = 0;
var tempactivetime = 0;

function preload(){
  dirt = loadImage("images/dirt.jpg");
  bush= loadImage("images/bush.png")
  popSound = loadSound("sounds/pop.ogg");
  soundTrack = loadSound("sounds/soundtrack.mp3");
  gigifont = loadFont("GIGI.TTF")
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
}

function keyPressed() {
  if (keyIsDown('80')){
    if (pause === 0) {
      pause = 1;
      inactivetime = milliseconds;
      tempactivetime = activetimeinseconds;
      console.log(inactivetime);
    }
    else{
      pause = 0;
      //activetimeinseconds+=tempactivetime;
    }
  }
}


function draw() {
  if (gameend == 1){
    image(dirt,0,0);
    image(dirt,dirt.width,0);

    textAlign(CENTER);
    textSize(100);
    textFont(gigifont);
    fill(255);
    text("THE END", 650,150);
    text("You kept it going for"+activetimeinseconds+"seconds", 650, 300);

  }
  if (gameend == 0){
    if (keyIsDown('32')){
      stop = 0;
    }
    if (stop == 1){
      image(dirt,0,0);
      image(dirt,dirt.width,0);

      textAlign(CENTER);
      textSize(80);
      textFont(gigifont);
      fill(255);
      text("Press Space to Play", 650,150);
      textFont('Georgia');
      textSize(25);
      text("The predators eat the little insects. Control their speed with the W&S keys or the UP&DOWN arrows", 650, 360);
      text("Click anywhere to plant bushes for the insects to eat", 650, 410)
      text("Your Goal: KEEP EVERYTHING ALIVE!!",650, 460);
    }
    if (stop == 0){



      //incrementing the milliseconds
      milliseconds = millis();



      if (pause == 1){
        image(dirt,0,0);
        image(dirt,dirt.width,0);

        textAlign(CENTER);
        textSize(80);
        textFont(gigifont);
        fill(255);
        text("Game Paused. Press P to Play", 650,300);

      }
      if (pause == 0){

        activetime = milliseconds - inactivetime;

        activetimeinseconds = (activetime/1000)+tempactivetime;
        //console.log(activetimeinseconds);

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
      //displaying current time
      textAlign(LEFT);
      textSize(30);
      fill(255);
      textFont(gigifont);
      text("Time Played: " + activetimeinseconds, 10,30);
    }
  }
}
