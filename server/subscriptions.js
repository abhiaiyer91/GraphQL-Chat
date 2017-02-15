import { PubSub, SubscriptionManager } from 'graphql-subscriptions';

import schema from './schema';

const pubsub = new PubSub();

const subscriptionManager = new SubscriptionManager({
	schema,
	pubsub,
	setupFunctions: {
		messageAdded: (options, args) => ({
			newMessagesChannel: {
				filter: message => message.chatroomId === args.chatroomId
			}
		})
	},
});

// subscriptionManager.subscribe({
// 	query: `subscription {
// 		messageAdded(chatroomId:1){
// 			id
// 			text
// 		}
// 	}`,
// 	callback: (err, data) => {
// 		if(err){
// 			return console.log(err);
// 		}
// 	}
// });

// pubsub.publish('newMessagesChannel', {
// 	id: 123,
// 	text: "testing directly on server",
// 	chatroomId: 1,
// 	userId: 1
// });

export { subscriptionManager, pubsub };
