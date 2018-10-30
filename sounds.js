var attackLevel = 1.0;
var releaseLevel = 0;

var attackTime = 0.001
var decayTime = 0.2;
var susPercent = 0.2;
var releaseTime = 0.5;
var notes = [739.99, 587.33,493.88,392,466.156,493.88,440,587.33,466.16,392,311.13,369.99,392,349.23,466.16,493.88,440,587.33,622.25,587.33,739.99,783.99,783.99,932.33,739.99,739.99]
var env, triOsc;
var noteIndex=0;


function soundSetup(){

  var cnv = createCanvas(100, 100);

  textAlign(CENTER);
  text('click to play', width/2, height/2);

  env = new p5.Env();
  env.setADSR(attackTime, decayTime, susPercent, releaseTime);
  env.setRange(attackLevel, releaseLevel);

  triOsc = new p5.Oscillator('triangle');
  triOsc.amp(env);
  triOsc.start();
  triOsc.freq(random(150,250));

    //f sharp, d, b , g b flat, b, a ,d bflat, g dsharp, f#, g f bflat, b a , d dsharp d fsharp, f, f, 
  //cnv.mousePressed(playEnv);
}

function playEnv(){
  //env.play();
  //console.log('gottem');
  triOsc.freq(notes[noteIndex]);
  noteIndex++;
  if (noteIndex==notes.length) {
    noteIndex=0;
  }
}