const path = require('path');

module.exports = {
  entry: {
    index: './src/js/index.jsx'
  },
  output: {
    path: path.join(__dirname, '/src/static/js/'),
    filename: '[name]_compiled.js',
  },
  module: {
    rules: [
      {
        // Test for js or jsx files
        test: /\.jsx?$/,
        loader: 'babel-loader',
        query: {
          // Convert ES6 syntax to ES5 for browser compatibility
          presets: ["@babel/preset-react", '@babel/preset-env'],
          compact: false,
        },
      },
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
};
