import test from 'ava';
import casual from 'casual';
import { times } from 'lodash';
import { db, Chatroom, User, Message } from './setup/backend';
import { chatrooms, chatroom, users, user, messages } from '../server/resolvers/query';
import { addMessage } from '../server/resolvers/mutation';
import path from 'path';
import fs from 'fs';
import fmt from 'fmt-obj';

test.before(async t => {
	casual.seed(123);
	return db.sync({ force: true }).then(() => {
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
					}).then(() => t.pass());
				});
			});
		});
	});
});

test.before('Data seeded correctly', async t => {
	const chatrooms = await Chatroom.findAll();
	const users = await User.findAll();
	const messages = await Message.findAll();
	t.is(chatrooms.length, 1);
	t.is(users.length, 5);
	t.is(messages.length, 5);
});

test('Query chatrooms', async t => {
	const data = await chatrooms({}, {}, {});
	t.is(data.length, 1);
});

test('Query chatroom 1', async t => {
	const data = await chatroom({}, { id: 1 }, {});
	t.true(data.hasOwnProperty('title'));
});

test('Query users', async t => {
	const data = await users({}, {}, {});
	t.is(data.length, 5);
});

test('Query users from chatroom 1', async t => {
	const data = await users({}, { chatroomId: 1 }, {});
	t.is(data.length, 5);
});

test('Query user 1', async t => {
	const data = await user({}, { id: 1 }, {});
	t.true(data.hasOwnProperty('displayName'));
});

test('Query messages', async t => {
	const data = await messages({}, {}, {});
	t.is(data.length, 5);
});

test('Query chatroom messages', async t => {
	const data = await messages({}, { chatroomId: 1 }, {});
	t.is(data.length, 5);
});

// test.after('Mutation addMessage', async t => {
// 	const msg = {
// 		text: 'Testing adding a message',
// 		userId: 1,
// 		chatroomId: 1
// 	};
// 	data = await addMessage({}, msg, {});
// 	t.is(data.text, msg.text);
// });

test.todo('Mutation publishes to pubsub');

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
