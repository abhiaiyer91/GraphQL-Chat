import Sequelize from 'sequelize';
import casual from 'casual';
import { times } from 'lodash';
import test from 'ava';
import fs from 'fs';
import path from 'path';

const db = new Sequelize('chatroom', null, null, {
	dialect: 'sqlite',
	storage: './test.sqlite',
	logging: false
});

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

const seed = () => {
	return new Promise((resolve, reject) => {
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
						}).then(() => resolve());
					});
				});
			});
		});
	});
}

test.before(async t => {
	await seed();
	t.pass();
});

test('Data seeded correctly', async t => {
	const chatrooms = await Chatroom.findAll();
	const users = await User.findAll();
	const messages = await Message.findAll();
	t.is(chatrooms.length, 1);
	t.is(users.length, 5);
	t.is(messages.length, 5);
});

test.after.always('cleanup', t => {
	let testDb = path.join(__dirname, '../test.sqlite');
	if (fs.existsSync(testDb)) {
		fs.unlink(testDb, () => {
			t.pass();
		});
	} else {
		t.pass();
	}
});


export { Chatroom, User, Message, seed };
