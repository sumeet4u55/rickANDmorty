const path = require('path');

module.exports = {
    target: 'web',
    entry: ['babel-polyfill', './js/app.js'],
    output: {
        path: path.resolve(__dirname, 'public/assets'),
        filename: 'bundle.js'
    },
    module: {
        rules: [{
            exclude: /node_modules/,
            use: {
                loader: 'babel-loader',
                options: {
                    presets: ['env']
                }
            }
        }]
    }
};