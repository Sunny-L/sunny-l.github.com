var path = require('path');
var express = require('express');
var webpack = require('webpack');
var config = require('./webpack-dev.config');

//
var app = express();
var compiler = webpack(config);

app.use(require('webpack-dev-middleware')(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
}));

app.use(require('webpack-hot-middleware')(compiler));

app.listen(5000, '127.0.0.1', function(err) {
  if (err) {
    console.log(err);
    return;
  }

  console.log('Listening at http://127.0.0.1:5000');
});
