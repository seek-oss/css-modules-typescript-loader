const path = require('path');
const webpack = require('webpack');
const memoryfs = require('memory-fs');

module.exports = (entry, options = {}) => {
  const { sourceMap, ...loaderOptions } = options;
  const compiler = webpack({
    context: path.dirname(entry),
    entry,
    output: {
      path: path.dirname(entry),
      filename: 'bundle.js'
    },
    module: {
      rules: [
        {
          test: /\.css$/,
          use: [
            {
              loader: require.resolve('../index.js'),
              options: loaderOptions
            },
            {
              loader: 'css-loader',
              options: {
                modules: true,
                sourceMap: !!sourceMap
              }
            }
          ]
        }
      ]
    }
  });

  compiler.outputFileSystem = new memoryfs();

  return new Promise((resolve, reject) => {
    compiler.run((err, stats) => {
      if (err || stats.hasErrors()) {
        reject({
          failed: true,
          errors: err || stats.toJson().errors
        });
      }

      resolve(stats);
    });
  });
};
