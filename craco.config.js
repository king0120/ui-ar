const { POSTCSS_MODES } = require("@craco/craco");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  style: {
    postcss: {
      mode: POSTCSS_MODES.file
    }
  },
  webpack: {
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    configure: (config) => {
      config.module.rules[2].oneOf.unshift({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: require.resolve('graphql-tag/loader'),
      })
      return config
    }
  }
}
