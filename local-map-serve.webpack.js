const path = require('path');

module.exports = {
    entry: './local-map-serve/index.js',
    output: {
        path: path.resolve(__dirname, 'data'),
        filename: 'bundle.js'
    },

    mode: 'development',
    devServer: {
        contentBase: path.resolve(__dirname, "local-map-serve"),
        host: '0.0.0.0',
        port: 9090,
        headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET',
            'Access-Control-Allow-Credentials': 'true',
        }
    }
};
