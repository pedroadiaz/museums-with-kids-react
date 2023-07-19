const { composePlugins, withNx } = require('@nx/webpack');
const { withReact } = require('@nx/react');
const dotenv = require('dotenv');

// Nx plugins for webpack.
module.exports = composePlugins(withNx(), withReact(), (config) => {
  // Update the webpack config as needed here.
  // e.g. `config.plugins.push(new MyPlugin())`
  return config;
});
