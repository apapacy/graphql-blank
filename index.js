require('babel-register')({
  "presets": [
    "es2015",
    "es2017",
    //    "react",
    "stage-0"
  ],
  "plugins": [
    //    "transform-decorators-legacy",
  ]
});
require('babel-polyfill');
const {
  graphql
} = require('graphql');
const readline = require('readline');
const utils = require('./app/utils');
const {
  mySchema
} = require('./schema/main.js');
const rli = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rli.question('Client Request: ', async inputQuery => {
  const result = await graphql(mySchema, inputQuery);
  console.log('Server Answer :', result.data);
  const [bb] = await utils.promi(rli, rli.question, 'what another');
  rli.close();
  console.log(bb);
});
