import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { subscriptionManager } from './subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser';
import express from 'express';
import schema from './schema';


let PORT = 4010;

if (process.env.PORT) {
	PORT = parseInt(process.env.PORT, 10) + 100;
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/graphql', graphqlExpress((req) => {
	// https://github.com/graphql/express-graphql/blob/3fa6e68582d6d933d37fa9e841da5d2aa39261cd/src/index.js#L257
	const query = req.query.query || req.body.query;
	if (query && query.length > 2000) {
		// None of our app's queries are this long
		// Probably indicates someone trying to send an overly expensive query
		throw new Error('Query too large.');
	}

	return {
		schema,
	};
}));

app.use('/graphiql', graphiqlExpress({
	endpointURL: '/graphql',
}));

app.listen(PORT, () => console.log( // eslint-disable-line no-console
	`API Server is now running on http://localhost:${PORT}`
));


new SubscriptionServer({
	subscriptionManager,
}, {
	server: app,
});
