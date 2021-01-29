const path = require('path');
//将 index.html 作为模板，打出到 dist 文件夹。
const HtmlWebpackPlugin = require('html-webpack-plugin');

//它是基于 webpack 的一个的 loader 插件，解析和转换 .vue  文件，提取出其中的逻辑代码 script、样式代码 style、以及 HTML 模版 template，
// 再分别把它们交给对应的 loader 去处理如 style-loader 、 less-loader 等等，核心的作用，就是 提取 。

// Vue 2.x 时代，需要 vue-template-compiler 插件处理 .vue 内容为 ast ， Vue 3.x 则变成 @vue/compiler-sfc 。

const {
  VueLoaderPlugin
} = require('vue-loader/dist/index');
const {
  CleanWebpackPlugin
} = require('clean-webpack-plugin')

module.exports = {
  mode: 'development', // 环境模式
  entry: path.resolve(__dirname, './src/main.js'), // 打包入口
  output: {
    path: path.resolve(__dirname, 'dist'), // 打包出口
    filename: 'js/[name].js' // 打包完的静态资源文件名
  },
  module: {
    rules: [{
        test: /\.vue$/,
        use: [
          'vue-loader'
        ]
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader'
        ]
      },
      {
        test: /(\.jsx|\.js)$/,
        use: {
            loader: 'babel-loader',
        },
        exclude: '/node_modules/'
    }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, './index.html'), // 我们要使用的 html 模板地址
      filename: 'index.html', // 打包后输出的文件名
      title: '手搭 Vue 开发环境' // index.html 模板内，通过 <%= htmlWebpackPlugin.options.title %> 拿到的变量
    }),
    // 添加 VueLoaderPlugin 插件
    //  VueLoaderPlugin 的职责是将你定义过的其它规则复制并应用到 .vue 文件里相应语言的块。例如，如果你有一条匹配 /\.js$/ 的规则，那么它会应用到 .vue 文件里的 <script> 块。
    new VueLoaderPlugin(),
    new CleanWebpackPlugin()
  ],
  devServer: {
    contentBase: path.resolve(__dirname, './dist'),
    port: 8080,
    publicPath: '/'
  }
}