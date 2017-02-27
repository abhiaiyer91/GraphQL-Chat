import { Message } from '../../models/index';
// import { pubsub } from '../../subscriptions';

const addMessage = (obj, args, context) => {
	return Message.create({
		text: args.text,
		userId: args.userId,
		chatroomId: args.chatroomId
	}).then(message => {
		// pubsub.publish('newMessagesChannel', message.dataValues);
		return message.dataValues
	});
}

export { addMessage };
