import React, { Component } from 'react';
import PropTypes from 'prop-types';
import P5Wrapper from 'react-p5-wrapper';
import sketch from './p5/sketch-basic.js';
import { withTracker } from 'meteor/react-meteor-data';
import { Goal } from '../api/goal.js';
import { Coins } from '../api/coins.js';
import { Name } from '../api/name.js';


class App extends Component {

  constructor(props) {
    super(props);

    this.state = {
      coin: {},
      goal: {},
      name: {},
    };
 
  }

  // this happens when we click the render display button
  sendGoal(id, targetGoal) {
    console.log('App.jsx received target goal', targetGoal);
    Meteor.call('send.goal', targetGoal);
    Meteor.call('goals.upsert', id, targetGoal);
    console.log(id);
  }

  sendName(name) {
    console.log('App.jsx received name', name);
    Meteor.call('send.name', name);
  }

  // render the html to the page
  render() {

    return (
      
      <div className="container">
        {/*<div className="introText"><h1>Hello,<br></br>What's your name?</h1></div>*/}
        {/*pass the p5 sktech file into the React wrapper
        also pass the ascii prop which will updated based on withTracker below*/}
        <P5Wrapper sketch={sketch} sendName={this.sendName} sendGoal={this.sendGoal} coin={this.props.coin} goal={this.props.goal} />
      </div>

    );
  }
}

App.defaultProps = {
  coin: {},
  goal: {},
  name: {},
};

App.propTypes = {
  coin: PropTypes.object.isRequired,
  goal: PropTypes.object.isRequired,
  name: PropTypes.object.isRequired,
};

export default withTracker(props => {
  Meteor.subscribe('allData');
  return {
    coin: Coins.find({}, { sort: { updatedAt: -1 } }).fetch()[0],
    goal: Goal.find({}).fetch()[0],
    name: Name.find({}).fetch()[0],
  };
})(App);