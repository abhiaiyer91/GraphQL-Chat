import { ChatroomResolve, MessageResolve } from './associations';
import { chatrooms, chatroom, users, user, messages } from './query';

import { addMessage } from './mutation';
import { messageAdded } from './subscription';

const resolvers = {
	Query: {
		chatrooms,
		chatroom,
		users,
		user,
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
