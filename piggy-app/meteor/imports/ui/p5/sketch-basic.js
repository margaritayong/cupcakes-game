// pass in p5.js as function argument p5
export default function sketch (p5) {
  let coin = {value:0};
  let id;

  // display size
  let gridWidth = 8;
  let gridHeight = 5;

  let localProps = {};

  // send goal button
  let goalButton;

  // set new goal target
  let newTargetGoal; 

  var input, button, greeting;

  p5.setup = function() {
    // create canvas
    p5.createCanvas(710, 400);

    input = p5.createInput();
    input.position(20, 65);

    button = p5.createButton('submit');
    button.position(input.x + input.width, 65);
    button.mousePressed(sendGoal);

    greeting = p5.createElement('h2', 'what is your goal?');
    greeting.position(20, 5);

    p5.textAlign(p5.CENTER);
    p5.textSize(50);

  }

  p5.draw = function() {
    
  }

  // function greet() {
  // var name = input.value();
  // greeting.html('hello '+name+'!');
  // input.value('');

  // for (var i=0; i<200; i++) {
  //   p5.push();
  //   p5.fill(p5.random(255), 255, 255);
  //   p5.translate(p5.random(p5.width), p5.random(p5.height));
  //   p5.rotate(p5.random(2*p5.PI));
  //   p5.text(name, 0, 0);
  //   p5.pop();
  // }
// }

  // initUI
  function initUI() {
    goalButton = p5.createButton('send goal');
    goalButton.position(16, 60);
    goalButton.mousePressed(sendGoal);
  }

  function sendGoal() {
    var newTargetGoal = input.value();
    input.value('');

    console.log("just clicked send goal!");
    console.log(newTargetGoal);
    localProps.sendGoal(id, newTargetGoal);
  }

  // Draw UI
  function drawUI() {

    // temporary UI and text controls
    p5.fill(255);
    // p5.text(coin.value, p5.width/2-30, p5.height/2-20);

  }

  // this special function receives data from App.jsx withTracker
  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    console.log("myCustomRedrawAccordingToNewPropsHandler", props, localProps);

    if (!localProps.sendGoal) {
      localProps.sendGoal = props.sendGoal;
    }

    

    if (props.goal) {
      id = props.goal._id;
      targetGoal = props.goal.targetGoal;
    }

    if (props.coin) {
      // get the new coin object
      coin = props.coin;
    }


  };
};










