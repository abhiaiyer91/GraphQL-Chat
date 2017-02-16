import test from 'ava';
import { Chatroom, User, Message } from '../server/models';

const resolver = (fieldName, root) => root[fieldName];

test.before(t => {
	t.pass();
});

test('Data seeded correctly', async t => {
	const chatrooms = Chatroom.findAll().dataValues;
	const users = User.findAll().dataValues;
	const messages = Message.findAll().dataValues;
	t.is(await chatrooms.length, 1);
	t.is(await users, 5);
	t.is(await messages, 5);
});

test.todo('Query chatroom users');

test.todo('Query chatroom messages');

test.todo('Mutation addMessage');

test.todo('Mutation publishes to pubsub');
