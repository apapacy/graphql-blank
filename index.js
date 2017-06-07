require('babel-register')({
  'presets': [
    'es2015',
    'es2017',
    //    'react',
    'stage-0'
  ],
  'plugins': [
    //    'transform-decorators-legacy',
  ]
});
require('babel-polyfill');
const {
  mySchema
} = require('./schema/main.js');
const {
  MongoClient
} = require('mongodb');


const graphqlHTTP = require('express-graphql');
const express = require('express');
const app = express();
const MONGO_URL = 'mongodb://localhost:27017/test';
MongoClient.connect(
  MONGO_URL, {
    w: 1,
    wtimeout: 60000,
    poolSize: 1000,
    reconnectTries: 999999999,
    reconnectInterval: 1000,
    autoReconnect: true,
    // keepAlive: 60000,
    connectTimeoutMS: 0,
    socketTimeoutMS: 0,
  },
  (err, db) => {
    if (err) {
      throw new Error('Fail connect to mongodb');
    } else {
      app.use('/graphql', graphqlHTTP({
        schema: mySchema,
        context: {
          db
        },
        graphiql: true,
      }));
    }
  });

app.listen(3000, () =>
  console.log('Running Express.js on port 3000'));
