const {POSTCSS_MODES} = require("@craco/craco");
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const tailwindcss = require('tailwindcss');
const purgecss = require('@fullhuman/postcss-purgecss');
const cssnano = require('cssnano');
const autoprefixer = require('autoprefixer');
const path = require('path');
// const DynamicCdnWebpackPlugin = require('dynamic-cdn-webpack-plugin');
module.exports = {
    style: {
        postcss: {
            // mode: POSTCSS_MODES.file
            plugins: [
                tailwindcss(),
                cssnano({
                    preset: 'default',
                }),
                autoprefixer
            ],
        }
    },
    eslint: {
        "plugins": [
            "cypress"
        ],
        "rules": {
            "no-extend-native": "off",
            "react-hooks/exhaustive-deps": "off"
        }
    },
    webpack: {
        optimization: {
            splitChunks: {
                chunks: 'all',
            },
        },
        plugins: [
            // new DynamicCdnWebpackPlugin(),
            new BundleAnalyzerPlugin({analyzerMode: 'static'}),
        ],
        configure: (config) => {
            config.module.rules[2].oneOf.unshift({
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: require.resolve('graphql-tag/loader'),
            });
            config.resolve.alias = {
                'react-dom': path.resolve(path.join(__dirname, 'node_modules', 'react-dom'))
            };
            config.optimization = {
                splitChunks: {
                    chunks: 'all',
                    minSize: 30 * 1024,
                    maxSize: 512 * 1024
                },
            };
            return config
        }
    }
};
