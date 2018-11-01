var creatures = [];
var predators = [];
var deadCreatures=[];
var plants=[];
var timecount = 0;
var sliderY=541; //plus or minus 41 pixels
var state=0;
var creatures = [];
var predators = [];
var deadCreatures=[];
var plants=[];
var timecount = 0;
var sliderY=500; //plus or minus 41 pixels
var pause = 0;
var stop = 4;
var gameend = 0;
var gigifont;
var milliseconds = 0;
var startTime=0;
var tempactivetime = 0;
var numPrey=0;
var numPreds=0;
var numPlants=0;
var pauseTime=0;


function mousePressed() {
  var plantTest= new plant(mouseX, mouseY);
  plants.push(plantTest);
  numPlants++;
}

function keyPressed() {
  console.log('pressed');
  if (keyCode=='32') {
    if (stop!=0) {
      if (stop === -1){
        creatures = [];
        predators = [];
        deadCreatures=[];
        plants=[];
        timecount = 0;
        sliderY=541; //plus or minus 41 pixels
        state=0;
        creatures = [];
        predators = [];
        deadCreatures=[];
        lants=[];
        timecount = 0;
        sliderY=500; //plus or minus 41 pixels
        pause = 0;
        stop = 4;
        gameend = 0;
        gigifont;
        milliseconds = 0;
        startTime=0;
        tempactivetime = 0;
        numPrey=0;
        numPreds=0;
        numPlants=0;
        pauseTime=0;
        for (var i = 0; i < 10; i++) {
          creatures.push( new preyCreature(random(width), random(height),100));
          numPrey+=1;
        }
        predators.push(new predatorCreature(500,500,100));
        numPreds+=1;


      }
      stop-=1;
    }

  }
  else if (keyCode=='80'){
    if (pause === 0) {
      pause = 1;
      inactivetime = milliseconds;
      tempactivetime = activetimeinseconds;
      console.log(inactivetime);
    }
    else{
      pause = 0;
    }
  }
}

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
  for (var i = 0; i < 10; i++) {
    creatures.push( new preyCreature(random(width), random(height),100));
    numPrey+=1;
  }
  predators.push(new predatorCreature(500,500,100));
  numPreds+=1;
  noiseDetail(24);
  soundTrack.play();

}

function draw() {
  if ((keyIsDown('83') ||keyIsDown(DOWN_ARROW)) && sliderY<541) {
           sliderY+=1;
         }
  if ((keyIsDown('87')||keyIsDown(UP_ARROW)) && sliderY>459) {
       sliderY-=1;
  }
  if(gameend==0){
    if (stop==4){
      noCursor();
      background(0);
      textAlign(LEFT);
      textSize(30);
      fill(255);
      text("ecosystem",200,190);
      textSize(20);
      text("ek-oh-sis-tuhm, ee-koh-",200,220);
      text("a biological community of interacting organisms and their physical environment",200,250);
      textAlign(CENTER);
      text("(space)",width/2,500);
    }
    else if (stop == 3){
      noCursor();
      background(0);
      textAlign(LEFT);
      textSize(20);
      text("The predators eat the prey. The prey eat the plants. You make the plants.",200,220);
      text("Click your mouse to make a plant.",200,250);
      textAlign(CENTER);
      text("(click mouse)",width/2,470);
      text("(space)",width/2,500);
      noCursor();
      imageMode(CENTER);
      image(bush,mouseX,mouseY,30,30);
      for(var w =0; w<plants.length; w++){
        plants[w].moveAndDisplay();
      }

    }
    else if (stop == 2){
      fill(255);
      background(0);
      textAlign(LEFT);
      textSize(20);
      text("Keep the ecosystem alive for as long as possible.",200,190);
      text("If all of the predators or all of the prey die, the game ends.",200,220);
      text("Control the speed of the predators with the W and S keys.",200,250);
      text("Press p to pause the game.",200,280);
      textAlign(CENTER);
      text("(hold w or s)",width/2,470);
      text("(space)",width/2,500);
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
      for(var w =0; w<plants.length; w++){
        plants[w].moveAndDisplay();
      }
    }

    else if (stop == 1){
      fill(255);
      background(0);
      textSize(50);
      textAlign(CENTER);
      text("ECOSECT",width/2,220);
      noCursor();
      textSize(20);
      text("(space)",width/2,500);
    }
    else if (stop == 0){
      if (predators.length===0 || creatures.length===0) {
        stop=-1;
      }
      image(dirt,0,0);
      image(dirt,dirt.width,0);
      milliseconds = millis();
      if (pause == 1){
        if (pauseTime===0) {
          pauseTime=milliseconds;
        }
        textAlign(CENTER);
        textSize(30);
        fill(255);
        text("Game paused. Press p to Play", width/2,height/2);

      }
      if (startTime==0) {
        startTime=milliseconds;
      }
      else if (pause == 0){
        if(pauseTime!=0){
          pauseTime=milliseconds-pauseTime;
          startTime+=pauseTime;
          pauseTime=0
        }
        //background(0);
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
        for(var w =0; w<plants.length; w++){
          plants[w].moveAndDisplay();
        }
        for (var i = 0; i < creatures.length; i++) {
          if (creatures[i].health>90 && creatures[i].dead==0) {
            if (random()<.004 && creatures.length<130) {
              creatures.push( new preyCreature(creatures[i].x, creatures[i].y, 80));
              numPrey++;
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
              //console.log("goteem");
          }
          for (var j = 0; j < plants.length; j++) {
            creatures[i].attractPlant(plants[j]);
            creatures[i].repulsePlant(plants[j]);
          }
          creatures[i].moveAndDisplay();
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
          if (predators[d].health>108 && predators[d].dead!=0) {
            if (random()<.003 &&predators.length<12 ) {
              predators[d].health=70;
              predators.push( new predatorCreature(predators[d].x, predators[d].y, 70));
              numPreds++;
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
        //displaying current time
        textAlign(LEFT);
        textSize(25);
        fill(255);
        text(Math.round((milliseconds-startTime)/1000),10,25);
      }
    }
    else if (stop===-1) {
      fill(255);
      background(0);
      textSize(50);
      textAlign(CENTER);
      text("ECOSECT",width/2,210);
      textSize(20);
      text(numPrey+" total prey created.",width/2,250);
      text(numPreds+" total predators created.",width/2,280)
      text(Math.round((milliseconds-startTime)/1000)+" seconds ecosystem lasted.",width/2,310)
      text("(press space to play again)",width/2, 340);
      noCursor();
      textSize(20);
    }
  }
}
