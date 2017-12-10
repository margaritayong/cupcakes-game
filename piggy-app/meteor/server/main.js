import { Meteor } from 'meteor/meteor';
import { Goal } from '../imports/api/goal.js';
import { connect } from 'mqtt/lib/connect';
import SerialPort from 'serialport';
import coins from '../imports/api/coins.js';
import allData from '../imports/api/allData.js';
 
console.log (Goal.find({}).fetch());
var goal = Goal.find({}).fetch();
let targetGoal;
let currentTargetGoal;
if (goal.length > 0) {
  targetGoal = goal[0].targetGoal;
  currentTargetGoal = goal[0]._id;
}

// var allMyCoins = Coins.find({}).fetch();
// var myMoney = 0;

// for (i = 0; i < allMyCoins.length; i++) {
//   myMoney += allMyCoins[i].value;
// }


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
