import { RedisPubSub } from "graphql-redis-subscriptions";
import { withFilter } from "graphql-subscriptions";

const pubsub = new RedisPubSub();

pubsub.publish("NOTIFICATION_CREATED", {
  notification: {
    notificationMessage: 'Sample Message',
    id: 'a1234',
    userId: 'userId123',
    isRead: false
  }
});

const NotificationResolver = {

  Subscription: {
    notification: {
      subscribe: withFilter(
        () => pubsub.asyncIterator("NOTIFICATION_CREATED"),
        (payload, variables, context) => {
          const userId = payload.commentsCreated.userId
          return !userId || context.loginUser === userId
        },
      ),
    }
  },
};
