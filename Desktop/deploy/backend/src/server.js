import { dataInit } from './upload'
import { createPubSub, createSchema, createYoga } from 'graphql-yoga'
import { createServer } from 'node:http'
import { useServer } from 'graphql-ws/lib/use/ws'
import { WebSocketServer } from 'ws'
import * as fs from 'fs'
import Query from './resolvers/Query';
import Mutation from './resolvers/Mutation';
// import Subscription from './resolvers/Subscription';
import Spot from './models/spot';
import Distance from "./models/distance";
import During from "./models/during";
import { UserModel } from './models/userModel';
import { ReportModel } from './models/reportModel'
import express from 'express';
import cors from 'cors';

const app = express();
const pubsub = createPubSub();
const path = require('path');

// context function
const redisContext = ({ req, connection }) => {
  const userId = req && req.cookies && req.cookies.userId
  return {
    loginUser: userId || ''
  }
}

dataInit()
const yoga = createYoga({
  schema: createSchema({
    typeDefs: fs.readFileSync(
      './src/schema.graphql',
      'utf-8'
    ),
    resolvers: {
      Query,
      Mutation,
      // Subscription,
    },
  }),
  context: {
    Spot,
    UserModel,
    ReportModel,
    Distance,
    During,
    pubsub,
    redisContext,
  },
  graphiql: {
    subscriptionsProtocol: 'WS',
  },
});

// app.use(cors())
app.use('/graphql', yoga)

const __dirname = path.resolve();
app.use(express.static(path.join(__dirname, "../frontend", "build")));
app.get("/*", function (req, res) {
  res.sendFile(path.join(__dirname, "../frontend", "build", "index.html"))
});

export default app;
// app.get('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

// const server = createServer(yoga)

// const wsServer = new WebSocketServer({
//   server: server,
//   path: yoga.graphqlEndpoint,
// })

// useServer(
//   {
//     execute: (args) => args.rootValue.execute(args),
//     subscribe: (args) => args.rootValue.subscribe(args),
//     onSubscribe: async (ctx, msg) => {
//       const { schema, execute, subscribe, contextFactory, parse, validate } =
//         yoga.getEnveloped({
//           ...ctx,
//           req: ctx.extra.request,
//           socket: ctx.extra.socket,
//           params: msg.payload
//         })

//       const args = {
//         schema,
//         operationName: msg.payload.operationName,
//         document: parse(msg.payload.query),
//         variableValues: msg.payload.variables,
//         contextValue: await contextFactory(),
//         rootValue: {
//           execute,
//           subscribe
//         }
//       }

//       const errors = validate(args.schema, args.document)
//       if (errors.length) return errors
//       return args
//     },
//   },
//   wsServer,
// )