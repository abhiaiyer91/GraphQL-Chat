import test from 'ava';
import { Chatroom, User, Message } from './backend';
import { chatrooms, users, messages } from '../server/resolvers/query';

test('Query chatrooms', t => {
	chatrooms({}, {}, {}).then(chatrooms => {
		t.is(chatrooms.length, 1);
	});
});

test('Query users', t => {
	users({}, {}, {}).then(users => {
		t.is(users.length, 5);
	});
});

test('Query messages', t => {
	messages({}, {}, {}).then(messages => {
		t.is(messages.length, 5);
	});
});

test.todo('Query chatroom messages');

test.todo('Mutation addMessage');

test.todo('Mutation publishes to pubsub');

