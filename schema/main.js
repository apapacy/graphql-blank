import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import {
  MongoClient
} from 'mongodb';
import assert from 'assert';
import {promisay} from '../app/utils';
const MONGO_URL = 'mongodb://localhost:27017/test';

promisay(MongoClient, MongoClient.connect, MONGO_URL)
.then(db => {
  console.log('Connected to MongoDB server');
  // The readline interface code
}, err =>
  console.log(err)
);

const roll = () => Math.floor(6 * Math.random()) + 1;

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: () => 'world'
    },
    diceRoll: {
      type: new GraphQLList(GraphQLInt),
      args: {
        count: {
          type: GraphQLInt,
          defaultValue: 2,
        },
      },
      resolve: (_, args) => {
        let rolls = [];
        for (let i = 0; i < args.count; i++) {
          rolls.push(roll());
        }
        return rolls;
      }
    },
  },
});

export const mySchema = new GraphQLSchema({
  query: queryType,
});
