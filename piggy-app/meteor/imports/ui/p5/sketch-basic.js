// pass in p5.js as function argument p5
export default function sketch (p5) {
  let coin = {value:0};
  let id;

  let localProps = {};
  let goalButton;
  let newTargetGoal; 
  var targetWidth;
  var input, button, greeting;
  var username;
  var name;

  p5.setup = function() {
    p5.createCanvas(800, 600);
    p5.colorMode(255);

    greeting = p5.createElement('h1', 'Hello, what is your name?');
    greeting.position(300, 100);
    greeting.addClass('introText');

    username = p5.createInput();
    username.position(490, 400);
    username.addClass('usernameBox');

    nameButton = p5.createButton('submit');
    nameButton.position(650, 490);
    nameButton.addClass('nameBtn');
    nameButton.mousePressed(sendName);
  }

  p5.draw = function() {

  }

  function sendName() {
    p5.createCanvas(screen.width, screen.height);
    p5.colorMode(255);

    name = username.value();
    greeting.html('Hello '+name+'!');
    username.value('');

    console.log("just clicked sign up!");
    console.log(name);
    localProps.sendName(name);

    username.addClass('hide');
    nameButton.addClass('hide');
    setGoal();

  }

  function setGoal() {
    
    inputGoal = p5.createElement('h2', "How much would you like to save?");
    inputGoal.position(500, 280);
    p5.textAlign(p5.CENTER);

    
    input = p5.createInput('', "$");
    input.position(500, 340);
    input.addClass('usernameBox');


    button = p5.createButton('submit');
    button.position(650, 430);
    button.addClass('nameBtn');
    button.mousePressed(sendGoal);

  }

  function sendGoal() {
    var newTargetGoal = input.value();
    input.value('');

    console.log("just clicked send goal!");
    console.log(newTargetGoal);
    localProps.sendGoal(id, newTargetGoal);

    inputGoal.addClass('hide');
    input.addClass('hide');
    button.addClass('hide');
    greeting.addClass('hide');
    saveGoal();
  
  }

  function saveGoal() {

    p5.createCanvas(screen.width, screen.height);
    p5.background(242, 184, 162);
    savedGoal = p5.createElement('h1', "Goal saved!");
    savedGoal.position(500, 120);
    p5.textAlign(p5.CENTER);

    nextButton = p5.createButton('see progress');
    nextButton.position(620, 280);
    nextButton.addClass('progressBtn');
    nextButton.mousePressed(showProgress);

  }

  function showProgress() {
    
    savedGoal.addClass('hide');
    nextButton.addClass('hide');

    p5.createCanvas(screen.width, screen.height);
    p5.background(242, 209, 179);

    currentBalance = p5.createElement('h1', "Your balance is ");
    currentBalance.position(400, 120);
    p5.textAlign(p5.CENTER);

    var targetWidth = 300;
    var coinValue = coin.value;
    var coinWidth = (coinValue/targetGoal)*300;
    
    var coinString = p5.str(coinValue);
    p5.textAlign(p5.CENTER);
    var displayCoin = p5.createElement('h1', coinString);

    displayCoin.position(600, 200);
    displayCoin.addClass('balance');
    
    // key legend
    p5.fill(85, 122, 147);
    p5.textSize(20);
    p5.text("0", 530, 470);
    p5.text(p5.str(targetGoal), 830, 470);

    // target bar
    p5.fill(85, 122, 147);
    p5.rectMode(p5.CENTER);
    p5.strokeWeight(0);
    p5.rect(680, 440, targetWidth, 20, 5);

    // progress bar
    p5.fill(242, 114, 136);
    p5.rectMode(p5.CORNER);
    p5.strokeWeight(0);
    p5.rect(530, 430, coinWidth, 20, 5);
  }


  // this special function receives data from App.jsx withTracker
  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {
    console.log("myCustomRedrawAccordingToNewPropsHandler", props, localProps);

    if (!localProps.sendGoal) {
      localProps.sendGoal = props.sendGoal;
    }

    if (!localProps.sendName) {
      localProps.sendName = props.sendName;
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










