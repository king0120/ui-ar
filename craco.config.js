const { POSTCSS_MODES } = require("@craco/craco");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const tailwindcss = require('tailwindcss')
const purgecss = require('@fullhuman/postcss-purgecss')
const cssnano = require('cssnano')
const autoprefixer = require('autoprefixer')
const path = require('path')

module.exports = {
  style: {
    postcss: {
      plugins: [
        tailwindcss(),
        cssnano({
          preset: 'default',
        }),
        autoprefixer
      ],
    }
  },
  webpack: {
    optimization: {
      splitChunks: {
        chunks: 'all',
      },
    },
    plugins: [
      new BundleAnalyzerPlugin()
    ],
    configure: (config) => {
      config.module.rules[2].oneOf.unshift({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: require.resolve('graphql-tag/loader'),
      })
      config.externals = {
        // react: 'React',
        // 'react-dom': 'ReactDOM',
        // lodash: '_'
      }
      return config
    }
  }
}
