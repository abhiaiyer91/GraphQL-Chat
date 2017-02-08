import { merge } from 'lodash';
import { makeExecutableSchema } from 'graphql-tools';

const rootSchema = [`
type Query {
  messages: Int
}

type Subscription {
  messageReceived: Int
}

schema {
  query: Query
  subscription: Subscription
}
`];

const rootResolvers = {
  Query: {
    messages() {
      console.log('Message Recieved');
      return 1;
    }
  },
  Subscription: {
    messageReceived() {
      // the subscription payload is the comment.
      console.log('Message Recieved');
      return 1;
    },
  },
};

// Put schema together into one array of schema strings
// and one map of resolvers, like makeExecutableSchema expects
const schema = [...rootSchema];
const resolvers = merge(rootResolvers);

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
