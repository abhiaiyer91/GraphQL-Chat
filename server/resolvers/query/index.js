import { Chatroom, Message, User } from '../../models/index';

const chatrooms = (obj, args, context) => {
	return Chatroom.findAll();
};

const chatroom = (obj, args, context) => {
	return Chatroom.findOne({
		where: {
			id: args.id
		}
	}).then(chatroom => chatroom.dataValues);
};

const users = (obj, args, context) => {
	return 'chatroomId' in args ?
		User.findAll({
			where: {
				chatroomId: args.chatroomId
			}
		}) :
		User.findAll();
};

const user = (obj, args, context) => {
	return User.findOne({
		where: {
			id: args.id
		}
	}).then(user => user.dataValues);
};

const messages = (obj, args, context) => {
	return 'chatroomId' in args ?
		Message.findAll({
			where: {
				chatroomId: args.chatroomId
			}
		}) :
		Message.findAll();
};

export { chatrooms, chatroom, users, user, messages };
