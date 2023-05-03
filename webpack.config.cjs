const path = require('path')
const cwd = process.cwd()
const HtmlWebpackPlugin = require('html-webpack-plugin')

/**
 * Create webpack aliases
 */
// eslint-disable-next-line space-before-function-paren
function createWebpackAliases(aliases) {
  const result = {}
  for (const name in aliases) {
    result[name] = path.join(cwd, aliases[name])
  }
  return result
}

module.exports = {
  entry: path.join(__dirname, 'src', 'index.tsx'),
  output: {
    path: path.resolve(__dirname, 'dist')
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.json', '.js', '.jsx'],
    alias: createWebpackAliases({
      '@assets': 'assets',
      '@src': 'src'
    })
  },
  module: {
    rules: [
      {
        test: /\.(ts|tsx)$/,

        exclude: /node_modules/,
        use: {
          loader: 'swc-loader',
          options: {
            sync: true,
            jsc: {
              parser: {
                syntax: 'typescript'
              }
            }
          }
        }
      },
      {
        test: /\.css$/i,
        exclude: /node_modules/,
        use: ['style-loader', 'css-loader', 'postcss-loader']
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'public', 'index.html')
    })
  ]
}
