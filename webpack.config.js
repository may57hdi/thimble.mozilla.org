"use strict";

const webpack = require("webpack");
// const ExtractTextPlugin = require("extract-text-webpack-plugin");
const path = require("path");

const env = require("./server/lib/environment");

const IS_DEVELOPMENT = env.get("NODE_ENV") === "development";
const plugins = [];

if(!IS_DEVELOPMENT) {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin()
  );
}

function absolutePublicPath(filePath) {
  return path.resolve(__dirname, "public", filePath);
}

const HOMEPAGE_CONFIG = {
  entry: [
    "homepage/scripts/main.js"
  ]
  .map(absolutePublicPath),

  output: {
    path: path.resolve(__dirname, "dist/homepage"),
    pathinfo: IS_DEVELOPMENT,
    filename: "scripts/main.js"
  }
};

const PROJECTS_LIST_CONFIG = {
  entry: [
    "projects-list/scripts/main.js"
  ]
  .map(absolutePublicPath),

  output: {
    path: path.resolve(__dirname, "dist/projects-list"),
    pathinfo: IS_DEVELOPMENT,
    filename: "scripts/main.js"
  }
};

const EDITOR_CONFIG = {
  entry: [
    "editor/scripts/main"
  ]
  .map(absolutePublicPath),

  output: {
    path: path.resolve(__dirname, "dist/editor"),
    pathinfo: IS_DEVELOPMENT,
    filename: "scripts/main.js"
  }
};

module.exports = [
  HOMEPAGE_CONFIG,
  PROJECTS_LIST_CONFIG,
  EDITOR_CONFIG
].map(config => Object.assign(config, {
  plugins
}));