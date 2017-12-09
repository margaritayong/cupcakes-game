import { Mongo } from 'meteor/mongo';
export const Goal = new Mongo.Collection('goal');
import { check } from 'meteor/check';


if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('goal', function goalPublication() {
    return Goal.find({});
  });
}

// http://docs.meteor.com/api/collections.html#Mongo-Collection-upsert
Meteor.methods({
  'goals.upsert'(id, targetGoal) {

    let currentGoal = Goal.upsert({
      _id: id
    },
    {
      $set: {
        targetGoal: targetGoal,
        updatedAt: new Date(),
      }
    });
    
    if (currentGoal.insertedId) {
      return currentGoal.insertedId;
    } else {
      return id;
    }
  },

  'goals.update.balance'(id, value) {

    Goal.update({
      _id: id
    },
    { 
      $inc: {
        balance: value,
      }
    
    });
  }

})