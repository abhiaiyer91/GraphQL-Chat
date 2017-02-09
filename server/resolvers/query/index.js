import { Chatroom, Message, User } from '../../models/index';

const chatrooms = (obj, args, context) => {
	return Chatroom.findAll();
}

const users = (obj, args, context) => {
	return User.findAll();
}

const messages = (obj, args, context) => {
	return Message.findAll();
};

export { chatrooms, users, messages };
