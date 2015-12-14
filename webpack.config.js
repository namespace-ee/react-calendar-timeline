var webpack = require("webpack");
var path = require("path");

module.exports = {
	context: __dirname,
	entry: {
		app: "./src/index.js",
	},
	output: {
		path: path.join(__dirname, "build/dist/"),
		filename: "react-calendar-timeline.js",
		publicPath: "dist/",
		library: "ReactCalendarTimeline",
		libraryTarget: "umd",
	},
	debug: true,
	devtool: "sourcemap",
	module: {
		loaders: [
			// { test: /\.json$/, loader: "json" },
      {
        test: /\.scss$/,
        // Query parameters are passed to node-sass
        loader: 'style!css!sass?outputStyle=expanded&' +
          'includePaths[]=' + (path.resolve(__dirname, './bower_components')) + '&' +
          'includePaths[]=' + (path.resolve(__dirname, './node_modules'))
      },
			{ test: /\.(js|jsx)$/, loaders: ["babel"], exclude: /node_modules/ },
		]
	},
	plugins: [
		new webpack.NoErrorsPlugin(),
	],
	externals: {
		"react": "React",
		"react-dom": "ReactDOM",
		"moment": "moment",
    "interact.js": "interact"
	},
	resolve: {
		// root: [__dirname, path.join(__dirname, "src"), path.join(__dirname, "docs")],
		/* alias: {
			"react-dom": "react/lib/ReactDOM"
		}, */
		extensions: ["", ".js", ".jsx", ".scss", ".md"]
	}
};
