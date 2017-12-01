var require = meteorInstall({"imports":{"api":{"goal.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// imports/api/goal.js                                                                   //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
module.export({
  Goal: () => Goal
});
let Mongo;
module.watch(require("meteor/mongo"), {
  Mongo(v) {
    Mongo = v;
  }

}, 0);
let check;
module.watch(require("meteor/check"), {
  check(v) {
    check = v;
  }

}, 1);
const Goal = new Mongo.Collection('goal');

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('goal', function goalPublication() {
    return Goal.find({});
  });
} // http://docs.meteor.com/api/collections.html#Mongo-Collection-upsert


Meteor.methods({
  'goals.upsert'(targetGoal) {
    Goal.upsert({
      targetGoal: targetGoal
    }, {
      $set: {
        targetGoal: targetGoal,
        updatedAt: new Date()
      }
    });
  }

});
///////////////////////////////////////////////////////////////////////////////////////////

}}},"server":{"main.js":function(require,exports,module){

///////////////////////////////////////////////////////////////////////////////////////////
//                                                                                       //
// server/main.js                                                                        //
//                                                                                       //
///////////////////////////////////////////////////////////////////////////////////////////
                                                                                         //
module.export({
  config: () => config,
  client: () => client
});
let Meteor;
module.watch(require("meteor/meteor"), {
  Meteor(v) {
    Meteor = v;
  }

}, 0);
let Goal;
module.watch(require("../imports/api/goal.js"), {
  default(v) {
    Goal = v;
  }

}, 1);
let connect;
module.watch(require("mqtt/lib/connect"), {
  connect(v) {
    connect = v;
  }

}, 2);
let SerialPort;
module.watch(require("serialport"), {
  default(v) {
    SerialPort = v;
  }

}, 3);
const Readline = SerialPort.parsers.Readline;
const parser = new Readline();
var port = new SerialPort('/dev/cu.usbmodem1431', {
  baudRate: 9600
});
port.pipe(parser); // parse the data from serial into meaningful objects

function onData(data) {
  console.log("meteor onData: " + data); // send the character over mqtt
  // client.publish("led", text);
} // setup the callback for the parser
// our callback function must be wrapped in Meteor.bindEnvironment to avoid Fiber errors


parser.on('data', Meteor.bindEnvironment(onData)); // setup the callback for the port
// Open errors will be emitted as an error event

port.on('error', function (err) {
  console.log('Error: ', err.message);
}); // serial event

function writeSerialData(data) {
  var buffer = Buffer.from(data);
  port.write(data, function (err) {
    if (err) {
      return console.log('Error on write: ', err.message);
    }

    console.log('meteor wrote', data);
  });
}

function saveGoalInDataBase(targetGoal) {
  Meteor.call('goals.upsert', targetGoal);
} // meteor


Meteor.methods({
  'send.goal'(targetGoal) {
    console.log("Meteor send.goal", targetGoal);
    client.publish("targetGoal", targetGoal); // publish via mqtt
  }

}); // MQTT

const config = {
  mqttHost: "mqtt://127.0.0.1",
  mqttPort: 1883
};
const client = connect(config.mqttHost);

function onMessage(topic, message) {
  if (topic === "targetGoal") {
    console.log("message", message.toString());
    Meteor.call('goals.upsert', targetGoal);
  }
} // client callback


client.on('message', Meteor.bindEnvironment(onMessage));
client.on("connect", function () {
  console.log("---- mqtt client connected ----");
  client.subscribe("targetGoal"); // subscribe to the targetGoal topic
});
Meteor.startup(() => {// code to run on server at startup
});
///////////////////////////////////////////////////////////////////////////////////////////

}}},{
  "extensions": [
    ".js",
    ".json",
    ".jsx"
  ]
});
require("./server/main.js");
//# sourceURL=meteor://💻app/app/app.js
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1ldGVvcjovL/CfkrthcHAvaW1wb3J0cy9hcGkvZ29hbC5qcyIsIm1ldGVvcjovL/CfkrthcHAvc2VydmVyL21haW4uanMiXSwibmFtZXMiOlsibW9kdWxlIiwiZXhwb3J0IiwiR29hbCIsIk1vbmdvIiwid2F0Y2giLCJyZXF1aXJlIiwidiIsImNoZWNrIiwiQ29sbGVjdGlvbiIsIk1ldGVvciIsImlzU2VydmVyIiwicHVibGlzaCIsImdvYWxQdWJsaWNhdGlvbiIsImZpbmQiLCJtZXRob2RzIiwidGFyZ2V0R29hbCIsInVwc2VydCIsIiRzZXQiLCJ1cGRhdGVkQXQiLCJEYXRlIiwiY29uZmlnIiwiY2xpZW50IiwiZGVmYXVsdCIsImNvbm5lY3QiLCJTZXJpYWxQb3J0IiwiUmVhZGxpbmUiLCJwYXJzZXJzIiwicGFyc2VyIiwicG9ydCIsImJhdWRSYXRlIiwicGlwZSIsIm9uRGF0YSIsImRhdGEiLCJjb25zb2xlIiwibG9nIiwib24iLCJiaW5kRW52aXJvbm1lbnQiLCJlcnIiLCJtZXNzYWdlIiwid3JpdGVTZXJpYWxEYXRhIiwiYnVmZmVyIiwiQnVmZmVyIiwiZnJvbSIsIndyaXRlIiwic2F2ZUdvYWxJbkRhdGFCYXNlIiwiY2FsbCIsIm1xdHRIb3N0IiwibXF0dFBvcnQiLCJvbk1lc3NhZ2UiLCJ0b3BpYyIsInRvU3RyaW5nIiwic3Vic2NyaWJlIiwic3RhcnR1cCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFBQUEsT0FBT0MsTUFBUCxDQUFjO0FBQUNDLFFBQUssTUFBSUE7QUFBVixDQUFkO0FBQStCLElBQUlDLEtBQUo7QUFBVUgsT0FBT0ksS0FBUCxDQUFhQyxRQUFRLGNBQVIsQ0FBYixFQUFxQztBQUFDRixRQUFNRyxDQUFOLEVBQVE7QUFBQ0gsWUFBTUcsQ0FBTjtBQUFROztBQUFsQixDQUFyQyxFQUF5RCxDQUF6RDtBQUE0RCxJQUFJQyxLQUFKO0FBQVVQLE9BQU9JLEtBQVAsQ0FBYUMsUUFBUSxjQUFSLENBQWIsRUFBcUM7QUFBQ0UsUUFBTUQs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Q0QsR0FMRDtBQU9EOztBQUVELFNBQVNZLGtCQUFULENBQTRCN0IsVUFBNUIsRUFBd0M7QUFDdENOLFNBQU9vQyxJQUFQLENBQVksY0FBWixFQUE0QjlCLFVBQTVCO0FBQ0QsQyxDQUVEOzs7QUFDQU4sT0FBT0ssT0FBUCxDQUFlO0FBQ2IsY0FBWUMsVUFBWixFQUF3QjtBQUV0QmtCLFlBQVFDLEdBQVIsQ0FBWSxrQkFBWixFQUFnQ25CLFVBQWhDO0FBQ0FNLFdBQU9WLE9BQVAsQ0FBZSxZQUFmLEVBQTZCSSxVQUE3QixFQUhzQixDQUdvQjtBQUUzQzs7QUFOWSxDQUFmLEUsQ0FVQTs7QUFDTyxNQUFNSyxTQUFTO0FBQ3BCMEIsWUFBVSxrQkFEVTtBQUVwQkMsWUFBVTtBQUZVLENBQWY7QUFLQSxNQUFNMUIsU0FBU0UsUUFBUUgsT0FBTzBCLFFBQWYsQ0FBZjs7QUFFUCxTQUFTRSxTQUFULENBQW1CQyxLQUFuQixFQUEwQlgsT0FBMUIsRUFBbUM7QUFDakMsTUFBSVcsVUFBVSxZQUFkLEVBQTRCO0FBQzFCaEIsWUFBUUMsR0FBUixDQUFZLFNBQVosRUFBdUJJLFFBQVFZLFFBQVIsRUFBdkI7QUFDQXpDLFdBQU9vQyxJQUFQLENBQVksY0FBWixFQUE0QjlCLFVBQTVCO0FBQ0Q7QUFDRixDLENBRUQ7OztBQUNBTSxPQUFPYyxFQUFQLENBQVUsU0FBVixFQUFxQjFCLE9BQU8yQixlQUFQLENBQXVCWSxTQUF2QixDQUFyQjtBQUVBM0IsT0FBT2MsRUFBUCxDQUFVLFNBQVYsRUFBcUIsWUFBVztBQUM5QkYsVUFBUUMsR0FBUixDQUFZLGlDQUFaO0FBQ0FiLFNBQU84QixTQUFQLENBQWlCLFlBQWpCLEVBRjhCLENBRUU7QUFDakMsQ0FIRDtBQUtBMUMsT0FBTzJDLE9BQVAsQ0FBZSxNQUFNLENBQ25CO0FBQ0QsQ0FGRCxFIiwiZmlsZSI6Ii9hcHAuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBNb25nbyB9IGZyb20gJ21ldGVvci9tb25nbyc7XG5leHBvcnQgY29uc3QgR29hbCA9IG5ldyBNb25nby5Db2xsZWN0aW9uKCdnb2FsJyk7XG5pbXBvcnQgeyBjaGVjayB9IGZyb20gJ21ldGVvci9jaGVjayc7XG5cblxuaWYgKE1ldGVvci5pc1NlcnZlcikge1xuICAvLyBUaGlzIGNvZGUgb25seSBydW5zIG9uIHRoZSBzZXJ2ZXJcbiAgTWV0ZW9yLnB1Ymxpc2goJ2dvYWwnLCBmdW5jdGlvbiBnb2FsUHVibGljYXRpb24oKSB7XG4gICAgcmV0dXJuIEdvYWwuZmluZCh7fSk7XG4gIH0pO1xufVxuXG4vLyBodHRwOi8vZG9jcy5tZXRlb3IuY29tL2FwaS9jb2xsZWN0aW9ucy5odG1sI01vbmdvLUNvbGxlY3Rpb24tdXBzZXJ0XG5NZXRlb3IubWV0aG9kcyh7XG4gICdnb2Fscy51cHNlcnQnKHRhcmdldEdvYWwpIHtcblxuICAgIEdvYWwudXBzZXJ0KHtcbiAgICAgIHRhcmdldEdvYWw6IHRhcmdldEdvYWxcbiAgICB9LFxuICAgIHtcbiAgICAgICRzZXQ6IHtcbiAgICAgICAgdGFyZ2V0R29hbDogdGFyZ2V0R29hbCxcbiAgICAgICAgdXBkYXRlZEF0OiBuZXcgRGF0ZSgpLFxuICAgICAgfVxuICAgIH0pO1xuICB9XG59KSIsImltcG9ydCB7IE1ldGVvciB9IGZyb20gJ21ldGVvci9tZXRlb3InO1xuaW1wb3J0IEdvYWwgZnJvbSAnLi4vaW1wb3J0cy9hcGkvZ29hbC5qcydcbmltcG9ydCB7IGNvbm5lY3QgfSBmcm9tICdtcXR0L2xpYi9jb25uZWN0JztcbmltcG9ydCBTZXJpYWxQb3J0IGZyb20gJ3NlcmlhbHBvcnQnO1xuIFxuY29uc3QgUmVhZGxpbmUgPSBTZXJpYWxQb3J0LnBhcnNlcnMuUmVhZGxpbmU7XG5jb25zdCBwYXJzZXIgPSBuZXcgUmVhZGxpbmUoKTtcbnZhciBwb3J0ID0gbmV3IFNlcmlhbFBvcnQoJy9kZXYvY3UudXNibW9kZW0xNDMxJywge1xuICBiYXVkUmF0ZTogOTYwMFxufSk7XG5wb3J0LnBpcGUocGFyc2VyKTtcblxuXG4vLyBwYXJzZSB0aGUgZGF0YSBmcm9tIHNlcmlhbCBpbnRvIG1lYW5pbmdmdWwgb2JqZWN0c1xuZnVuY3Rpb24gb25EYXRhKGRhdGEpIHtcbiAgY29uc29sZS5sb2coXCJtZXRlb3Igb25EYXRhOiBcIiArIGRhdGEpO1xuICBcbiAgLy8gc2VuZCB0aGUgY2hhcmFjdGVyIG92ZXIgbXF0dFxuICAvLyBjbGllbnQucHVibGlzaChcImxlZFwiLCB0ZXh0KTtcbn1cblxuLy8gc2V0dXAgdGhlIGNhbGxiYWNrIGZvciB0aGUgcGFyc2VyXG4vLyBvdXIgY2FsbGJhY2sgZnVuY3Rpb24gbXVzdCBiZSB3cmFwcGVkIGluIE1ldGVvci5iaW5kRW52aXJvbm1lbnQgdG8gYXZvaWQgRmliZXIgZXJyb3JzXG5wYXJzZXIub24oJ2RhdGEnLCBNZXRlb3IuYmluZEVudmlyb25tZW50KG9uRGF0YSkpO1xuXG4vLyBzZXR1cCB0aGUgY2FsbGJhY2sgZm9yIHRoZSBwb3J0XG4vLyBPcGVuIGVycm9ycyB3aWxsIGJlIGVtaXR0ZWQgYXMgYW4gZXJyb3IgZXZlbnRcbnBvcnQub24oJ2Vycm9yJywgZnVuY3Rpb24oZXJyKSB7XG4gIGNvbnNvbGUubG9nKCdFcnJvcjogJywgZXJyLm1lc3NhZ2UpO1xufSlcblxuLy8gc2VyaWFsIGV2ZW50XG5mdW5jdGlvbiB3cml0ZVNlcmlhbERhdGEoZGF0YSkge1xuICB2YXIgYnVmZmVyID0gQnVmZmVyLmZyb20oZGF0YSk7XG5cbiAgcG9ydC53cml0ZShkYXRhLCBmdW5jdGlvbihlcnIpIHtcbiAgICBpZiAoZXJyKSB7XG4gICAgICByZXR1cm4gY29uc29sZS5sb2coJ0Vycm9yIG9uIHdyaXRlOiAnLCBlcnIubWVzc2FnZSk7XG4gICAgfVxuICAgIGNvbnNvbGUubG9nKCdtZXRlb3Igd3JvdGUnLCBkYXRhKTtcbiAgfSk7XG5cbn1cblxuZnVuY3Rpb24gc2F2ZUdvYWxJbkRhdGFCYXNlKHRhcmdldEdvYWwpIHtcbiAgTWV0ZW9yLmNhbGwoJ2dvYWxzLnVwc2VydCcsIHRhcmdldEdvYWwpO1xufVxuXG4vLyBtZXRlb3Jcbk1ldGVvci5tZXRob2RzKHtcbiAgJ3NlbmQuZ29hbCcodGFyZ2V0R29hbCkge1xuXG4gICAgY29uc29sZS5sb2coXCJNZXRlb3Igc2VuZC5nb2FsXCIsIHRhcmdldEdvYWwpO1xuICAgIGNsaWVudC5wdWJsaXNoKFwidGFyZ2V0R29hbFwiLCB0YXJnZXRHb2FsKTsgLy8gcHVibGlzaCB2aWEgbXF0dFxuXG4gIH1cbn0pXG5cbiBcbi8vIE1RVFRcbmV4cG9ydCBjb25zdCBjb25maWcgPSB7XG4gIG1xdHRIb3N0OiBcIm1xdHQ6Ly8xMjcuMC4wLjFcIixcbiAgbXF0dFBvcnQ6IDE4ODNcbn07XG5cbmV4cG9ydCBjb25zdCBjbGllbnQgPSBjb25uZWN0KGNvbmZpZy5tcXR0SG9zdCk7XG5cbmZ1bmN0aW9uIG9uTWVzc2FnZSh0b3BpYywgbWVzc2FnZSkge1xuICBpZiAodG9waWMgPT09IFwidGFyZ2V0R29hbFwiKSB7XG4gICAgY29uc29sZS5sb2coXCJtZXNzYWdlXCIsIG1lc3NhZ2UudG9TdHJpbmcoKSk7XG4gICAgTWV0ZW9yLmNhbGwoJ2dvYWxzLnVwc2VydCcsIHRhcmdldEdvYWwpO1xuICB9XG59XG5cbi8vIGNsaWVudCBjYWxsYmFja1xuY2xpZW50Lm9uKCdtZXNzYWdlJywgTWV0ZW9yLmJpbmRFbnZpcm9ubWVudChvbk1lc3NhZ2UpKTtcblxuY2xpZW50Lm9uKFwiY29ubmVjdFwiLCBmdW5jdGlvbigpIHtcbiAgY29uc29sZS5sb2coXCItLS0tIG1xdHQgY2xpZW50IGNvbm5lY3RlZCAtLS0tXCIpO1xuICBjbGllbnQuc3Vic2NyaWJlKFwidGFyZ2V0R29hbFwiKTsgLy8gc3Vic2NyaWJlIHRvIHRoZSB0YXJnZXRHb2FsIHRvcGljXG59KVxuXG5NZXRlb3Iuc3RhcnR1cCgoKSA9PiB7XG4gIC8vIGNvZGUgdG8gcnVuIG9uIHNlcnZlciBhdCBzdGFydHVwXG59KTtcbiJdfQ==
