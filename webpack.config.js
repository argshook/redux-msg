const path = require('path');
const webpack = require('webpack');
const deepAssign = require('deep-assign');

const baseConfig = {
  entry: {
    index: path.resolve(__dirname, 'index.js')
  },

  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'index.js'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        loaders: ['babel-loader?presets[]=es2015,presets[]=stage-0']
      },
      {
        test: /\.s?[a|c]ss$/,
        exclude: [/node_modules/],
        use: [
          'style-loader',
          'css-loader?modules&importLoaders=1',
          {
            loader: 'postcss-loader',
            options: {
              plugins: () => [ require('autoprefixer'), require('precss') ]
            }
          }
        ]
      }
    ]
  },

};

const devConfig = {};

const productionConfig = {
  plugins: (baseConfig.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      minimize: true,
      comments: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      }
    })
  ])
};

module.exports = (baseConfig => {
  switch (process.env.NODE_ENV) {
    case 'dev':
    default:
      return deepAssign({}, baseConfig, devConfig);

    case 'production':
      return deepAssign({}, baseConfig, productionConfig);
  }
})(baseConfig);

