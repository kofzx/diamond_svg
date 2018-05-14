module.exports = {
    entry: {
        index: './src/js/index',
        svg:   './src/js/svg.js',
        svg2:  './src/js/svg2.js'
    },
    output: {
        filename: '[name].js'
    },
    devtool: 'source-map',
    resolve: {
        extensions: ['.js']
    },
    module: {
        rules: [{
            test: /\.js$/,
            loader: 'babel-loader',
            exclude: ['node_modules'],
            query: {
                presets: ['es2015']
            }
        }]
    }
};