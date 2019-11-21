import webpack from "webpack";
import nodeExternals from "webpack-node-externals";
import { join } from "path";

const config: webpack.Configuration = {
  entry: "./lib/index.ts",
  target: "node",
  output: {
    path: join(__dirname, "dist"),
    filename: "index.js",
    libraryTarget: "commonjs"
  },
  resolve: {
    extensions: [".tsx", ".ts"]
  },
  mode: "production",
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  externals: [nodeExternals()]
};

module.exports = config;
