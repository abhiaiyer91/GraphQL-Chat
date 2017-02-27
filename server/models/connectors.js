import Sequelize from 'sequelize';

let sqlName = process.env.NODE_ENV === 'production' ? 'chatroom' : 'testing';

const sqlite = new Sequelize('chatroom', null, null, {
	dialect: 'sqlite',
	storage: `./${sqlName}.sqlite`,
	logging: false
});

export { sqlite };
