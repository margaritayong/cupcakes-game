import { Goal } from './goal.js';
import { Coins } from './coins.js';
import { Name } from './name.js';

if (Meteor.isServer) {
	Meteor.publish('allData', function allDataPublication() {
		return [
			Goal.find({}),
			Coins.find({}),
			Name.find({})
		]
	});
}