const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
// const ExtractTextPlugin = require('extract-text-webpack-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin') //自动删除前次打包文件
const OpenBrowserPlugin = require('open-browser-webpack-plugin')
const CopyWebpackPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const path = require('path')

module.exports = {
  mode: 'none',
  entry: __dirname + '/src/main.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'js/[name].js',
  },
  module: {
    rules: [
      {test: /(\.jsx|\.js)$/, use: {loader: 'babel-loader'}, exclude: /node_modules/},
      {test: /\.css$/, use: ['style-loader', 'css-loader']},
      {test: /\.less$/, use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader']},
      {test: /\.vue$/, loader:'vue-loader'},
      {test: /\.(png|jpg|gif)$/, loader: 'url-loader?limit=8192&name=images/[hash:8].[name].[ext]'},
    ]
  },
  resolve: {
    extensions: ['.vue', '.js', '.css', 'jsx', '.less'],
    alias:{
      'vue$': 'vue/dist/vue.esm.js'
    }
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: 'index.template.html',
      inject: 'body',
    }),
    new CleanWebpackPlugin(
      ['dist/main.*.js', 'dist/manifest.*.js'], //匹配删除的文件
      {
        root: __dirname,  //根目录
        verbose:  true,   //开启在控制台输出信息
        dry:      false   //启用删除文件
      }
    ),
    new OpenBrowserPlugin({
      url: 'http://localhost:1212'
    }),
    new CopyWebpackPlugin([      //忽略static文件夹的编译
      {
        from: path.resolve(__dirname, 'static'),
        to: 'static',
        ignore: ['.*']
      }
    ]),
    new VueLoaderPlugin(),
    new MiniCssExtractPlugin({filename: 'css/[name].css'})//打包成独立的css文件
  ],
  optimization: {
    splitChunks: {
      chunks: 'initial', // 只对入口文件处理
      cacheGroups: {
        vendor: { // split `node_modules`目录下被打包的代码到 `page/vendor.js && .css` 没找到可打包文件的话，则没有。css需要依赖 `ExtractTextPlugin`
          test: /node_modules\//,
          name: 'vendor',
          priority: 10,
          enforce: true
        },
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  devtool:'eval-source-map',
  devServer: {
    contentBase: path.resolve(__dirname, 'build'),
    historyApiFallback: true,
    port: 1212,
    inline: true
  } 
}