import Sequelize from 'sequelize';
import casual from 'casual';
import { sqlite as db } from './connectors';
import { times } from 'lodash';

const Chatroom = db.define('chatroom', {
	title: { type: Sequelize.STRING }
});

const Message = db.define('message', {
	text: { type: Sequelize.STRING },
	createdAt: { type: Sequelize.DATE, defaultValue: Date.now() }
});

const User = db.define('user', {
	displayName: { type: Sequelize.STRING }
});

Message.belongsTo(User);
Message.belongsTo(Chatroom);
Chatroom.hasMany(User);
Chatroom.hasMany(Message);
User.belongsTo(Chatroom);
User.hasMany(Message);

if (process.env.NODE_ENV === 'production') {
	casual.seed(123);
	db.sync({ force: true }).then(() => {
		Chatroom.create({
			title: casual.words(1)
		}).then(chatroom => {
			times(5, () => {
				return chatroom.createUser({
					displayName: casual.first_name
				}).then(user => {
					return chatroom.createMessage({
						text: casual.sentences(1),
						userId: user.dataValues.id,
						createdAt: casual.unix_time
					});
				});
			});
		});
	});
}

export { Chatroom, User, Message };
