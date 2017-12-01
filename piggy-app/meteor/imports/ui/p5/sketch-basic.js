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
    // p5.serial.on('data', serialEvent);     // callback for when new data arrives

    // create the UI
    initUI();

  }


  p5.draw = function() {
    p5.background(255);

    p5.noStroke();
    p5.textSize(22);
<<<<<<< HEAD
    p5.fill(255);
    p5.text("How was your day?", 10, 30);
    p5.text("sensor value: " + inData, 30, 60);

    p5.textSize(11);

    // process UI elements and update values
    r = rSlider.value();
    g = gSlider.value();
    b = bSlider.value();
=======
    p5.fill(0);
    p5.text("What is your goal?", 10, 30);
    p5.textSize(12);
>>>>>>> c48f911b17af76eee44e3a532c507a7db5832064

    drawUI();


  }
  

  //
  // initUI
  //
  function initUI() {
<<<<<<< HEAD
    rSlider = p5.createSlider(0, 255, 255);
    gSlider = p5.createSlider(0, 255, 255);
    bSlider = p5.createSlider(0, 255, 255);

    rSlider.position(10, 230);
    gSlider.position(10, 250);
    bSlider.position(10, 270);

    rSlider.style('width', '80px');
    gSlider.style('width', '80px');
    bSlider.style('width', '80px');

    button = p5.createButton('send to display');
    button.position(25, 300);
    button.mousePressed(sendToDisplay);

    nameButton = p5.createButton('send name');
    nameButton.position(25, 320);
    nameButton.mousePressed(sendName);

  }

  function sendToDisplay() {

    ledColor[0] = r; 
    ledColor[1] = g;
    ledColor[2] = b;

    // this is what gets sent
    console.log(localProps, ledColor);
    localProps.renderDisplay(ledColor);
  }

  function sendName() {
    console.log("just clicked send name");
    localProps.sendName('margarita');
=======
    goalButton = p5.createButton('send goal');
    goalButton.position(16, 60);
    goalButton.mousePressed(sendGoal);
>>>>>>> c48f911b17af76eee44e3a532c507a7db5832064
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










