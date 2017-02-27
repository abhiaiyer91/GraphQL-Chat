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

export { subscriptionManager, pubsub };
