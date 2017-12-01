var require = meteorInstall({"client":{"template.main.js":function(){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// client/template.main.js                                                                        //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
                                                                                                  // 1
Template.body.addContent((function() {                                                            // 2
  var view = this;                                                                                // 3
  return HTML.Raw('<div id="render-target"></div>');                                              // 4
}));                                                                                              // 5
Meteor.startup(Template.body.renderToDocument);                                                   // 6
                                                                                                  // 7
////////////////////////////////////////////////////////////////////////////////////////////////////

},"main.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// client/main.js                                                                                 //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var React = void 0;                                                                               // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var Meteor = void 0;                                                                              // 1
module.watch(require("meteor/meteor"), {                                                          // 1
  Meteor: function (v) {                                                                          // 1
    Meteor = v;                                                                                   // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var render = void 0;                                                                              // 1
module.watch(require("react-dom"), {                                                              // 1
  render: function (v) {                                                                          // 1
    render = v;                                                                                   // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var App = void 0;                                                                                 // 1
module.watch(require("../imports/ui/App.jsx"), {                                                  // 1
  "default": function (v) {                                                                       // 1
    App = v;                                                                                      // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
Meteor.startup(function () {                                                                      // 7
  render(React.createElement(App, null), document.getElementById('render-target'));               // 8
});                                                                                               // 9
////////////////////////////////////////////////////////////////////////////////////////////////////

}},"imports":{"ui":{"p5":{"sketch-basic.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/p5/sketch-basic.js                                                                  //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
module.export({                                                                                   // 1
  "default": function () {                                                                        // 1
    return sketch;                                                                                // 1
  }                                                                                               // 1
});                                                                                               // 1
                                                                                                  //
function sketch(p5) {                                                                             // 2
  // display size                                                                                 // 4
  var gridWidth = 8;                                                                              // 5
  var gridHeight = 5; // display array -> can be sent to hardware                                 // 6
  //let ledPixels = []; // updating this to just color for now                                    // 9
                                                                                                  //
  var ledColor = ["255", "255", "255"];                                                           // 10
  var localProps = {}; // send goal button                                                        // 12
                                                                                                  //
  var goalButton = void 0; // set goal target                                                     // 15
                                                                                                  //
  var targetGoal = 100;                                                                           // 18
                                                                                                  //
  p5.setup = function () {                                                                        // 20
    p5.createCanvas(300, 400); // create the UI                                                   // 21
                                                                                                  //
    initUI();                                                                                     // 24
  };                                                                                              // 26
                                                                                                  //
  p5.draw = function () {                                                                         // 29
    p5.background(255);                                                                           // 30
    p5.noStroke();                                                                                // 32
    p5.textSize(22);                                                                              // 33
    p5.fill(0);                                                                                   // 34
    p5.text("What is your goal?", 10, 30);                                                        // 35
    p5.textSize(12);                                                                              // 36
    drawUI();                                                                                     // 38
  }; //                                                                                           // 40
  // initUI                                                                                       // 43
  //                                                                                              // 44
                                                                                                  //
                                                                                                  //
  function initUI() {                                                                             // 45
    goalButton = p5.createButton('send goal');                                                    // 46
    goalButton.position(16, 60);                                                                  // 47
    goalButton.mousePressed(sendGoal);                                                            // 48
  }                                                                                               // 49
                                                                                                  //
  function sendGoal() {                                                                           // 51
    console.log("just clicked send goal!");                                                       // 52
    localProps.sendGoal(targetGoal);                                                              // 53
  } //                                                                                            // 54
  // Draw UI                                                                                      // 57
  //                                                                                              // 58
                                                                                                  //
                                                                                                  //
  function drawUI() {                                                                             // 59
    // temporary UI and text controls                                                             // 61
    p5.fill(255);                                                                                 // 62
  } // this special function receives data from App.jsx withTracker                               // 65
                                                                                                  //
                                                                                                  //
  p5.myCustomRedrawAccordingToNewPropsHandler = function (props) {                                // 68
    console.log("myCustomRedrawAccordingToNewPropsHandler", props, localProps);                   // 69
                                                                                                  //
    if (!localProps.sendGoal) {                                                                   // 71
      localProps.sendGoal = props.sendGoal;                                                       // 72
    }                                                                                             // 73
  };                                                                                              // 76
}                                                                                                 // 77
                                                                                                  //
;                                                                                                 // 77
////////////////////////////////////////////////////////////////////////////////////////////////////

}},"App.jsx":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/ui/App.jsx                                                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
var _classCallCheck2 = require("babel-runtime/helpers/classCallCheck");                           //
                                                                                                  //
var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);                                  //
                                                                                                  //
var _possibleConstructorReturn2 = require("babel-runtime/helpers/possibleConstructorReturn");     //
                                                                                                  //
var _possibleConstructorReturn3 = _interopRequireDefault(_possibleConstructorReturn2);            //
                                                                                                  //
var _inherits2 = require("babel-runtime/helpers/inherits");                                       //
                                                                                                  //
var _inherits3 = _interopRequireDefault(_inherits2);                                              //
                                                                                                  //
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
                                                                                                  //
var React = void 0,                                                                               // 1
    Component = void 0;                                                                           // 1
module.watch(require("react"), {                                                                  // 1
  "default": function (v) {                                                                       // 1
    React = v;                                                                                    // 1
  },                                                                                              // 1
  Component: function (v) {                                                                       // 1
    Component = v;                                                                                // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var PropTypes = void 0;                                                                           // 1
module.watch(require("prop-types"), {                                                             // 1
  "default": function (v) {                                                                       // 1
    PropTypes = v;                                                                                // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var P5Wrapper = void 0;                                                                           // 1
module.watch(require("react-p5-wrapper"), {                                                       // 1
  "default": function (v) {                                                                       // 1
    P5Wrapper = v;                                                                                // 1
  }                                                                                               // 1
}, 2);                                                                                            // 1
var sketch = void 0;                                                                              // 1
module.watch(require("./p5/sketch-basic.js"), {                                                   // 1
  "default": function (v) {                                                                       // 1
    sketch = v;                                                                                   // 1
  }                                                                                               // 1
}, 3);                                                                                            // 1
var withTracker = void 0;                                                                         // 1
module.watch(require("meteor/react-meteor-data"), {                                               // 1
  withTracker: function (v) {                                                                     // 1
    withTracker = v;                                                                              // 1
  }                                                                                               // 1
}, 4);                                                                                            // 1
var Led = void 0;                                                                                 // 1
module.watch(require("../api/led.js"), {                                                          // 1
  Led: function (v) {                                                                             // 1
    Led = v;                                                                                      // 1
  }                                                                                               // 1
}, 5);                                                                                            // 1
                                                                                                  //
var App = function (_Component) {                                                                 //
  (0, _inherits3.default)(App, _Component);                                                       //
                                                                                                  //
  function App(props) {                                                                           // 11
    (0, _classCallCheck3.default)(this, App);                                                     // 11
                                                                                                  //
    var _this = (0, _possibleConstructorReturn3.default)(this, _Component.call(this, props));     // 11
                                                                                                  //
    _this.state = {                                                                               // 14
      led: []                                                                                     // 15
    };                                                                                            // 14
    return _this;                                                                                 // 11
  } // this happens when we click the render display button                                       // 18
                                                                                                  //
                                                                                                  //
  App.prototype.sendGoal = function () {                                                          //
    function sendGoal(targetGoal) {                                                               //
      console.log('App.jsx received target goal', targetGoal);                                    // 23
      Meteor.call('send.goal', targetGoal);                                                       // 24
    }                                                                                             // 25
                                                                                                  //
    return sendGoal;                                                                              //
  }(); // render the html to the page                                                             //
                                                                                                  //
                                                                                                  //
  App.prototype.render = function () {                                                            //
    function render() {                                                                           //
      return React.createElement(                                                                 // 30
        "div",                                                                                    // 31
        {                                                                                         // 31
          className: "container"                                                                  // 31
        },                                                                                        // 31
        React.createElement(P5Wrapper, {                                                          // 34
          sketch: sketch,                                                                         // 34
          sendGoal: this.sendGoal,                                                                // 34
          led: this.props.led                                                                     // 34
        })                                                                                        // 34
      );                                                                                          // 31
    }                                                                                             // 37
                                                                                                  //
    return render;                                                                                //
  }();                                                                                            //
                                                                                                  //
  return App;                                                                                     //
}(Component);                                                                                     //
                                                                                                  //
App.defaultProps = {                                                                              // 40
  led: []                                                                                         // 41
};                                                                                                // 40
App.propTypes = {                                                                                 // 44
  led: PropTypes.array.isRequired                                                                 // 45
};                                                                                                // 44
module.exportDefault(withTracker(function (props) {                                               // 1
  Meteor.subscribe('led');                                                                        // 49
  return {                                                                                        // 50
    led: Led.find({}, {                                                                           // 51
      sort: {                                                                                     // 51
        updatedAt: -1                                                                             // 51
      }                                                                                           // 51
    }).fetch()[0]                                                                                 // 51
  };                                                                                              // 50
})(App));                                                                                         // 53
////////////////////////////////////////////////////////////////////////////////////////////////////

}},"api":{"led.js":function(require,exports,module){

////////////////////////////////////////////////////////////////////////////////////////////////////
//                                                                                                //
// imports/api/led.js                                                                             //
//                                                                                                //
////////////////////////////////////////////////////////////////////////////////////////////////////
                                                                                                  //
module.export({                                                                                   // 1
  Led: function () {                                                                              // 1
    return Led;                                                                                   // 1
  }                                                                                               // 1
});                                                                                               // 1
var Mongo = void 0;                                                                               // 1
module.watch(require("meteor/mongo"), {                                                           // 1
  Mongo: function (v) {                                                                           // 1
    Mongo = v;                                                                                    // 1
  }                                                                                               // 1
}, 0);                                                                                            // 1
var check = void 0;                                                                               // 1
module.watch(require("meteor/check"), {                                                           // 1
  check: function (v) {                                                                           // 1
    check = v;                                                                                    // 1
  }                                                                                               // 1
}, 1);                                                                                            // 1
var Led = new Mongo.Collection('led');                                                            // 2
                                                                                                  //
if (Meteor.isServer) {                                                                            // 6
  // This code only runs on the server                                                            // 7
  Meteor.publish('led', function () {                                                             // 8
    function ledPublication() {                                                                   // 8
      return Led.find({});                                                                        // 9
    }                                                                                             // 10
                                                                                                  //
    return ledPublication;                                                                        // 8
  }());                                                                                           // 8
} // http://docs.meteor.com/api/collections.html#Mongo-Collection-upsert                          // 11
                                                                                                  //
                                                                                                  //
Meteor.methods({                                                                                  // 14
  'led.insert': function (pixels) {}                                                              // 15
});                                                                                               // 14
////////////////////////////////////////////////////////////////////////////////////////////////////

}}}},{
  "extensions": [
    ".js",
    ".json",
    ".html",
    ".css",
    ".jsx"
  ]
});
require("./client/template.main.js");
require("./client/main.js");