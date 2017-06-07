import {
  GraphQLSchema,
  GraphQLObjectType,
  GraphQLString,
  GraphQLInt,
  GraphQLList,
} from 'graphql';

import assert from 'assert';
import {promisay} from '../app/utils';

const roll = () => Math.floor(6 * Math.random()) + 1;

const queryType = new GraphQLObjectType({
  name: 'RootQuery',
  fields: {
    hello: {
      type: GraphQLString,
      resolve: (root, args, {db}) => {
        console.log(db);
        db.collection('users').insert({name: 'Joe'})
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
  },
});

export const mySchema = new GraphQLSchema({
  query: queryType,
});
