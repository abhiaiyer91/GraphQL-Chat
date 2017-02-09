import { makeExecutableSchema } from 'graphql-tools';
import { merge } from 'lodash';
import resolvers from './resolvers';
import schema from './schema.graphql';

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
