import { Meteor } from 'meteor/meteor';
import { Goal } from '../imports/api/goal.js';
import { connect } from 'mqtt/lib/connect';
import SerialPort from 'serialport';
import coins from '../imports/api/coins.js';
import Name from '../imports/api/name.js';
import allData from '../imports/api/allData.js';
 
console.log (Goal.find({}).fetch());
var goal = Goal.find({}).fetch();
let targetGoal;
let currentTargetGoal;
let user;
let name;
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

function saveNameInDataBase(name) {
  user = Meteor.call('name.upsert', user);
}

// meteor
Meteor.methods({
  'send.goal'(targetGoal) {

    console.log("Meteor send.goal", targetGoal);
    client.publish("targetGoal", targetGoal.toString()); // publish via mqtt

  },
  'send.name'(name) {

    console.log("Meteor send.name", name);
    client.publish("name", name); // publish via mqtt

  }
})

 
// MQTT
export const config = {
  // mqttHost: "mqtt://172.20.10.5",
  mqttHost: "mqtt://192.168.2.11",
  mqttPort: 1883
};

export const client = connect(config.mqttHost);

function onMessage(topic, message) {
  if (topic === "targetGoal") {
    // console.log("message", message.toString());
    console.log(message.toString());
    saveGoalInDataBase(targetGoal);
  }
  if (topic === "coins") {
    // console.log("message", message.toString());
    console.log(message.toString());
    var coinString = message.toString();
    var coinFloat = parseFloat(coinString);
    Meteor.call('coins.insert', coinFloat);
  }
  if (topic === "name") {
    Meteor.call('name.upsert', message.toString());
  }
}

// client callback
client.on('message', Meteor.bindEnvironment(onMessage));

client.on("connect", function() {
  console.log("---- mqtt client connected ----");
  client.subscribe("targetGoal"); // subscribe to the targetGoal topic
  client.subscribe("coins");
  client.subscribe("name");
})

Meteor.startup(() => {
  // code to run on server at startup
});
