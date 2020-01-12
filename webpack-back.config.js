const path = require('path');
const nodeExternals = require('webpack-node-externals');
module.exports = {
    target: 'node',
    entry: {
        app: ['babel-polyfill', './src/index.js']
    },
    output: {
        path: path.resolve(__dirname, './build'),
        filename: 'bundle-back.js'
    },
    externals: [nodeExternals()],
    module: {
        rules: [{
            test: /\.js$/,
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    },
    node: {
        __dirname: true
    }
};