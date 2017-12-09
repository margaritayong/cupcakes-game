import { Meteor } from 'meteor/meteor';
import { Goal } from '../imports/api/goal.js';
import { connect } from 'mqtt/lib/connect';
import SerialPort from 'serialport';
import coins from '../imports/api/coins.js';
import allData from '../imports/api/allData.js';
 
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
var port = new SerialPort('/dev/cu.SLAB_USBtoUART', {
  baudRate: 9600
});
port.pipe(parser);

console.log (Goal.find({}).fetch());
var goal = Goal.find({}).fetch();
let targetGoal;
let currentTargetGoal;
if (goal.length > 0) {
  targetGoal = goal[0].targetGoal;
  currentTargetGoal = goal[0]._id;
}


// parse the data from serial into meaningful objects
function onData(data) {
  console.log("meteor onData: " + data);
  
  // send the character over mqtt
  // client.publish("led", text);
}

// setup the callback for the parser
// our callback function must be wrapped in Meteor.bindEnvironment to avoid Fiber errors
parser.on('data', Meteor.bindEnvironment(onData));

// setup the callback for the port
// Open errors will be emitted as an error event
port.on('error', function(err) {
  console.log('Error: ', err.message);
})

// serial event
function writeSerialData(data) {
  var buffer = Buffer.from(data);

  port.write(data, function(err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }
    console.log('meteor wrote', data);
  });

}

function saveGoalInDataBase(targetGoal) {
  currentTargetGoal = Meteor.call('goals.upsert', currentTargetGoal, targetGoal);
}

// meteor
Meteor.methods({
  'send.goal'(targetGoal) {

    console.log("Meteor send.goal", targetGoal);
    client.publish("targetGoal", targetGoal.toString()); // publish via mqtt

  }
})

 
// MQTT
export const config = {
  mqttHost: "mqtt://172.20.10.5",
  mqttPort: 1883
};

export const client = connect(config.mqttHost);

function onMessage(topic, message) {
  if (topic === "targetGoal") {
    // console.log("message", message.toString());
    console.log(message.toString());
    Meteor.call('goals.upsert', targetGoal);
  }
  if (topic === "coins") {
    // console.log("message", message.toString());
    console.log(message.toString());
    var coinString = message.toString();
    var coinFloat = parseFloat(coinString);
    Meteor.call('coins.insert', coinFloat);
  }
}

// client callback
client.on('message', Meteor.bindEnvironment(onMessage));

client.on("connect", function() {
  console.log("---- mqtt client connected ----");
  client.subscribe("targetGoal"); // subscribe to the targetGoal topic
  client.subscribe("coins"); // subscribe to the targetGoal topic
})

Meteor.startup(() => {
  // code to run on server at startup
});
