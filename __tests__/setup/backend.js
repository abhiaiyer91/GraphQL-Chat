import Sequelize from 'sequelize';
import test from 'ava';

let db, Chatroom, Message, User;

test.before(t => {
	db = new Sequelize('chatroom', null, null, {
		dialect: 'sqlite',
		storage: './test.sqlite',
		logging: false
	});

	Chatroom = db.define('chatroom', {
		title: { type: Sequelize.STRING }
	});

	Message = db.define('message', {
		text: { type: Sequelize.STRING },
		createdAt: { type: Sequelize.DATE, defaultValue: Date.now() }
	});

	User = db.define('user', {
		displayName: { type: Sequelize.STRING }
	});

	Message.belongsTo(User);
	Message.belongsTo(Chatroom);
	Chatroom.hasMany(User);
	Chatroom.hasMany(Message);
	User.belongsTo(Chatroom);
	User.hasMany(Message);

	t.pass();
});

export { db, Chatroom, User, Message };
