const CopyPlugin = require('copy-webpack-plugin');

module.exports = {
  configureWebpack: {
    plugins: [
      new CopyPlugin({
        patterns: [{ from: './node_modules/ton-client-web-js/tonclient.wasm' }],
      }),
    ],
  },
  transpileDependencies: ['vuetify'],
};
