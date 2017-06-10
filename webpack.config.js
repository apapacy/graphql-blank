const path = require('path');
module.exports = {
  entry: './js/app.js',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'bundle.js'
  },
  module: {
    loaders: [{
      test: /\.js|\.jsx$/,
      exclude: /node_modules/,
      loader: 'babel-loader'
    }]
  },
};
