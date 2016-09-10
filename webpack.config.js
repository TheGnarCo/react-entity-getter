module.exports = {
  entry: './src/entityGetter.js',
  output: {
    path: `${__dirname}/build`,
    filename: 'entityGetter.js'
  },
  module: {
    loaders: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel',
        query: {
          presets: ['es2015']
        }
      }
    ]
  }
};
