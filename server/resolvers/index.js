import { ChatroomResolve, MessageResolve } from './associations';
import { chatrooms, messages, users } from './query';

import { messageReceived } from './subscription';

const resolvers = {
	Query: {
		chatrooms,
		users,
		messages
	},
	Chatroom: ChatroomResolve,
	Message: MessageResolve,
	// Mutation: {

	// },
	Subscription: {
		messageReceived
	}
};
export default resolvers;
