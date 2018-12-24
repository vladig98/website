// Coding Challenge 128: SketchRNN Snowflakes
// Daniel Shiffman
// https://thecodingtrain.com/CodingChallenges/128-sketchrnn-snowflakes.html
// https://youtu.be/pdaNttb7Mr8
// (insert p5 web editor link here)


let model;
let strokePath = null;

let x, y;
let pen = "down";

function setup() {
  createCanvas(windowWidth, windowHeight);
  x = random(-width / 2, width / 2);
  y = random(-height / 2, height / 2);
  model = ml5.SketchRNN("snowflake", modelReady);
  background(0);
}

function modelReady() {
  console.log("model ready");
  model.reset();
  model.generate(gotSketch);
}

function draw() {
  translate(width / 2, height / 2);
  if (strokePath != null) {
    let newX = x + strokePath.dx * 0.2;
    let newY = y + strokePath.dy * 0.2;
    if (pen == "down") {
      stroke(255);
      strokeWeight(2);
      line(x, y, newX, newY);
    }
    pen = strokePath.pen;
    strokePath = null;
    x = newX;
    y = newY;

    if (pen !== "end") {
      model.generate(gotSketch);
    } else {
      console.log("drawing complete");
      model.reset();
      model.generate(gotSketch);
      x = random(-width / 2, width / 2);
      y = random(-height / 2, height / 2);
    }
  }
}

function gotSketch(error, s) {
  if (error) {
    console.error(error);
  } else {
    strokePath = s;
    //console.log(strokePath);
  }
}