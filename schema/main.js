import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import assert from 'assert';
import {promisay} from '../app/utils';

const QuoteType = new GraphQLObjectType({
  name: 'Quote',
  fields: {
    id: {
      type: GraphQLString,
      resolve: obj => obj._id
    },
    text: { type: GraphQLString },
    author: { type: GraphQLString }
  }
});


const roll = () => Math.floor(6 * Math.random()) + 1;

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: async (root, args, {db}) => {
        const user = await db.collection('users').insert({name: 'Joe'});
        console.log(user);
        return 'world';
      }
    },
    diceRoll: {
      type: new GraphQLList(GraphQLString),
      args: {
        count: {
          type: GraphQLInt,
          defaultValue: 2,
        },
      },
      resolve: (_, args) => {
        let rolls = [];
        for (let i = 0; i < args.count; i++) {
          rolls.push(i + ': ' + roll());
        }
        return rolls;
      }
    },
    allQuotes: {
      type: new GraphQLList(QuoteType),
      description: 'A list of the quotes in the database',
      resolve: (_, args, { db }) =>
        db.collection('quotes').find().toArray()
    },
  },
});

export const mySchema = new GraphQLSchema({
  query: queryType,
});
