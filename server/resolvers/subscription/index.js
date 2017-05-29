import { withFilter } from 'graphql-subscriptions';
import { pubsub } from '../../subscriptions';

export const messageAdded = {
  subscribe: withFilter(
    () => pubsub.asyncIterator('messageAdded'),
    (payload, args) => {
      return payload.messageAdded.chatroomId === args.chatroomId;
    }
  ),
};
