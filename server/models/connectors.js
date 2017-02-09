import Sequelize from 'sequelize';

const sqlite = new Sequelize('chatroom', null, null, {
	dialect: 'sqlite',
	storage: './chatroom.sqlite',
	logging: false
});

export { sqlite };