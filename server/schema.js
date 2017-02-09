import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';
import schema from './schema.graphql';

const executableSchema = makeExecutableSchema({
  typeDefs: schema,
  resolvers,
});

export default executableSchema;
