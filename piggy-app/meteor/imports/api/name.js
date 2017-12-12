import { Mongo } from 'meteor/mongo';
export const Name = new Mongo.Collection('name');
import { check } from 'meteor/check';

if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('name', function namePublication() {
    return Name.find({});
  });
}

// http://docs.meteor.com/api/collections.html#Mongo-Collection-upsert
Meteor.methods({
  'name.upsert'(name) {

    Name.upsert({
      name: name
    },
    {
      $set: {
        name: name,
        updatedAt: new Date(),
      }
    });
  },
})