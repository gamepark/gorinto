const {override, addWebpackPlugin} = require('customize-cra')
const ImageminWebpWebpackPlugin = require('imagemin-webp-webpack-plugin')
const {aliasDangerous, configPaths} = require('react-app-rewire-alias/lib/aliasDangerous')

module.exports = (config, env) => {
  // A linked framework (yarn linkgp) must use the game's own React and types, not those of its repository
  config.resolve.symlinks = false
  config.module.rules.splice(0, 0, {
    test: /\.worker\.(js|ts)$/i,
    use: [{
      loader: 'comlink-loader',
      options: {
        singleton: true
      }
    }]
  })
  config.module.rules.push({
    test: /\.m?js$/,
    resolve: {fullySpecified: false}
  })
  return override(
    addWebpackPlugin(new ImageminWebpWebpackPlugin()),
    aliasDangerous(configPaths('./tsconfig.paths.json'))
  )(config, env)
}