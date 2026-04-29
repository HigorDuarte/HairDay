const path = require("path");
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  target: "web",
  mode: "development",

  entry: path.resolve(__dirname, "src", "main.js"),
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "dist"),
  },

  devServer:{
    static:{
      directory: path.resolve(__dirname, "dist")
    },
    port: 3000,
    open: true,
    liveReload: true,
  },

  plugins:[
    new htmlWebpackPlugin({
      template: path.resolve(__dirname, "index.html"),
      favicon: path.resolve("src", "assets", "scissors.svg"),
    }),
  ],

  module:{
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      {
        test: /\.(png|jpg|svg|jpeg|gif)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/[name].[hash][ext]'
        },
      },
    ],
  },
}

