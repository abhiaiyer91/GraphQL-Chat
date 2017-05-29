import { graphiqlExpress, graphqlExpress } from 'graphql-server-express';
import { createServer } from 'http';
import { subscriptionManager } from './subscriptions';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import bodyParser from 'body-parser';
import express from 'express';
import { execute, subscribe } from 'graphql';
import schema from './schema';

let PORT = 4010;

const WS_GQL_PATH = '/subscriptions';

if (process.env.PORT) {
  PORT = parseInt(process.env.PORT, 10) + 100;
}

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const server = createServer(app);

new SubscriptionServer({ schema, execute, subscribe }, { server, path: WS_GQL_PATH });

app.use(
  '/graphql',
  graphqlExpress(req => {
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
  })
);

app.use(
  '/graphiql',
  graphiqlExpress({
    endpointURL: '/graphql',
  })
);

server.listen(PORT, () => {
  console.log(`API Server is now running on http://localhost:${PORT}`); // eslint-disable-line no-console
  console.log(
    `API Server over web socket with subscriptions is now running on ws://localhost:${PORT}${WS_GQL_PATH}`
  ); // eslint-disable-line no-console
});
