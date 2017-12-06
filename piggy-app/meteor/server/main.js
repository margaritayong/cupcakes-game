import { Meteor } from 'meteor/meteor';
import Goal from '../imports/api/goal.js'
import { connect } from 'mqtt/lib/connect';
import SerialPort from 'serialport';
 
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
var port = new SerialPort('/dev/cu.SLAB_USBtoUART', {
  baudRate: 9600
});
port.pipe(parser);

let targetGoal = 100;

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
  Meteor.call('goals.upsert', targetGoal);
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
}

// client callback
client.on('message', Meteor.bindEnvironment(onMessage));

client.on("connect", function() {
  console.log("---- mqtt client connected ----");
  client.subscribe("targetGoal"); // subscribe to the targetGoal topic
})

Meteor.startup(() => {
  // code to run on server at startup
});
