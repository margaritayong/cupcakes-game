import { Mongo } from 'meteor/mongo';
 
export const Coins = new Mongo.Collection('coins');
import { check } from 'meteor/check';
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('coins', function coinsPublication() {
    return Coins.find({});
  });
}
// http://docs.meteor.com/api/collections.html#Mongo-Collection-upsert
Meteor.methods({
  'coins.insert'(value) {
    check(value, Number);
 
    Coins.insert({
      value: value,
      updatedAt: new Date()
    });
  }
})