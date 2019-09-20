const CopyWebpackPlugin = require('copy-webpack-plugin');
const webpack = require('webpack');
const path = require('path');

//const debug = process.env.NODE_ENV !== 'production';
const cesiumSource = './node_modules/cesium/Source';
const cesiumWorkers = '../Build/Cesium/Workers';
//const localMapData = './data';

const conf = {
    pages: {
        index: './src/index.js'
    },

    configureWebpack: {
        output: {
            sourcePrefix: ''
        },
        amd: {
            toUrlUndefined: true
        },
        resolve: {
            alias: {
                'vue$': 'vue/dist/vue.esm.js',
                '@': path.resolve('src'),
                'cesium': path.resolve(__dirname, cesiumSource)
            }
        },
        plugins: [
            new CopyWebpackPlugin([{from: path.join(cesiumSource, cesiumWorkers), to: 'cesium/Workers'}]),
            new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Assets'), to: 'cesium/Assets'}]),
            new CopyWebpackPlugin([{from: path.join(cesiumSource, 'Widgets'), to: 'cesium/Widgets'}]),
            new CopyWebpackPlugin([{from: path.join(cesiumSource, 'ThirdParty'), to: 'cesium/ThirdParty'}]),

            // for test data
            // new CopyWebpackPlugin([{from: localMapData, to: 'data'}]),

            new webpack.DefinePlugin({
                CESIUM_BASE_URL: JSON.stringify('cesium/')
            })
        ],
        module: {
            unknownContextRegExp: /^.\/.*$/,
            unknownContextCritical: false,

            rules: [
                {
                    // Remove pragmas
                    test: /\.js$/,
                    enforce: 'pre',
                    include: path.resolve(__dirname, cesiumSource),
                    use: [{
                        loader: 'strip-pragma-loader',
                        options: {
                            pragmas: {
                                debug: false
                            }
                        }
                    }]
                }
            ]
        },
    }
};

module.exports = conf;
