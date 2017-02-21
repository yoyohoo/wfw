let express = require('express')
var path = require('path');
var history = require('connect-history-api-fallback');

var app = express();
app.use(history());
var webpackDevMiddleware = require('webpack-dev-middleware');
var webpack = require('webpack');
var webpackConf = require('./webpack.dev.config')

app.use(express.static(path.join(__dirname, 'assets')));
app.use(webpackDevMiddleware(webpack(webpackConf), {
	contentBase: webpackConf.output.path,
	publicPath: webpackConf.output.devPath,
	hot: true,
	stats: {
		colors: true
	}
}))
app.listen(1002, function(err) {
	console.log('Listening at http://localhost:1002')
})