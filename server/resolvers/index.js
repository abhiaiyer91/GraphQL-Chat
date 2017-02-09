import { messageReceived } from './subscription';
import { messages } from './query';

const resolvers = {
	Query: {
		messages
	},
	// Mutation: {
		
	// },
	Subscription: {
		messageReceived
	}
};
export default resolvers;