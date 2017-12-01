// pass in p5.js as function argument p5
export default function sketch (p5) {

  // display size
  let gridWidth = 8;
  let gridHeight = 5;

  // display array -> can be sent to hardware
  //let ledPixels = []; // updating this to just color for now
  let ledColor = ["255", "255", "255"];

  let localProps = {};

  // send goal button
  let goalButton;

  // set goal target
  let targetGoal = 100;

  p5.setup = function() {
    p5.createCanvas(300,400);

    // create the UI
    initUI();

  }


  p5.draw = function() {
    p5.background(255);

    p5.noStroke();
    p5.textSize(22);
    p5.fill(0);
    p5.text("What is your goal?", 10, 30);
    p5.textSize(12);

    drawUI();

  }

  //
  // initUI
  //
  function initUI() {
    goalButton = p5.createButton('send goal');
    goalButton.position(16, 60);
    goalButton.mousePressed(sendGoal);
  }

  function sendGoal() {
    console.log("just clicked send goal!");
    localProps.sendGoal(targetGoal);
  }

  //
  // Draw UI
  //
  function drawUI() {

    // temporary UI and text controls
    p5.fill(255);


  }

  // this special function receives data from App.jsx withTracker
  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    console.log("myCustomRedrawAccordingToNewPropsHandler", props, localProps);

    if (!localProps.sendGoal) {
      localProps.sendGoal = props.sendGoal;
    }


  };
};










