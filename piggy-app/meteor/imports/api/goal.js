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
  'goals.upsert'(targetGoal) {

    Goal.upsert({
      targetGoal: targetGoal
    },
    {
      $set: {
        targetGoal: targetGoal,
        updatedAt: new Date(),
      }
    });
  }
})