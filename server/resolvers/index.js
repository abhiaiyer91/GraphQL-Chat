import { ChatroomResolve, MessageResolve } from './associations';
import { chatrooms, messages, users } from './query';

import { addMessage } from './mutation';
import { messageAdded } from './subscription';

const resolvers = {
	Query: {
		chatrooms,
		users,
		messages
	},
	Chatroom: ChatroomResolve,
	Message: MessageResolve,
	Mutation: {
		addMessage
	},
	Subscription: {
		messageAdded
	}
};
export default resolvers;
