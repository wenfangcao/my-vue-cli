const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin') //自动删除前次打包文件
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const path = require('path')

module.exports = {
  mode: 'none',
  entry: __dirname + "/src/index.js",
  output: {
    path: path.resolve(__dirname,"build"),
    filename: "app-[hash].js",
    hashDigestLength: 8,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        use: {
          loader: "babel-loader"
        },
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
          {
            loader: "style-loader"
          }, {
            loader: "css-loader"
          }
        ]
      },
    ]
  },
  resolve: {
    extensions: ['.vue','.js',".css",'jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html',
      inject: 'head',
    }),
    new CleanWebpackPlugin(
      ['dist/main.*.js','dist/manifest.*.js',],　 //匹配删除的文件
      {
          root: __dirname,       　　　　　　　　　　//根目录
          verbose:  true,        　　　　　　　　　　//开启在控制台输出信息
          dry:      false        　　　　　　　　　　//启用删除文件
      }
    ),
    new OpenBrowserPlugin({
      url: 'http://localhost:1212'
    }),
    // new webpack.HotModuleReplacementPlugin()
  ],
  devtool:'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, "build"),
    historyApiFallback: true,
    port: 1212,
    inline: true
  } 
}