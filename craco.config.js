module.exports = {
  webpack: {
    configure: (config) => {
      console.log (config.module.rules[2].oneOf)
      config.module.rules[2].oneOf.unshift({
        test: /\.(graphql|gql)$/,
        exclude: /node_modules/,
        loader: require.resolve ('graphql-tag/loader'),
      })
      return config
    }
  }
}
