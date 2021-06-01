const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
  entry: {
    // 入口模块
    index: './src/index.tsx'
  },
  output: {
    // 输出路径
    path: path.resolve('./dist'),
    // 输出的文件名格式，这里采用名字+内容hash片段的方式，用于清理缓存
    filename: 'scripts/[name].[contenthash:6].js',
    // 添加公共路径，主要用于history路由模式下
    publicPath: '/'
  },
  resolve: {
    // 支持的脚本后缀名，可以让我们在导入的时候省略掉
    extensions: ['.ts', '.tsx', '.js']
  },
  // 模式，development开发环境，production生产环境，会压缩代码
  mode: 'development',
  // 生成sourcemap
  devtool: 'source-map',
  module: {
    // 加载器规则
    rules: [
      {
        // 使用ts-loader处理ts|tsx后缀的代码
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        loader: 'ts-loader'
      },
      {
        // 使用MiniCssExtractPlugin.loader、css-loader处理css后缀的代码
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        // 使用file-loader处理jpg|png|svg|ico格式的文件
        test: /\.(jpg|png|svg|ico|webp)$/,
        loader: 'file-loader',
        options: {
          // 输出的文件名格式
          name: 'imgs/[name].[contenthash:6].[ext]'
        }
      },
      {
        // 使用file-loader处理字体文件
        test: /\.(woff2|ttf)$/,
        loader: 'file-loader',
        options: {
          name: 'fonts/[name].[contenthash:6].[ext]'
        }
      }
    ]
  },
  plugins: [
    // 清理插件，可以在每次编译之前清空dist目录
    new CleanWebpackPlugin(),
    // 可以将引入的样式合并输出到css文件
    new MiniCssExtractPlugin({
      filename: 'styles/[name].[contenthash:6].css'
    }),
    // 根据模板生成html文件
    new HtmlWebpackPlugin({
      filename: 'index.html',
      template: './src/index.html'
    })
  ],
  // 开发服务器
  devServer: {
    // 静态文件目录
    contentBase: path.resolve('./dist'),
    // 自动刷新
    hot: true,
    // 监听端口
    port: 3360,
    // 支持history路由模式
    historyApiFallback: true,
    // API代理
    proxy: {
      '/api/article': {
        target: 'https://assets.kscampus.io:10443',
        changeOrigin: true
      }
    }
  }
}
