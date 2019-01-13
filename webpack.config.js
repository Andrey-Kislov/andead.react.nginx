const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
 
module.exports = {
    mode: 'development',
    entry: {
        index: './src/components/index'
    },
    output: {
        path: path.resolve(__dirname, './public', (process.env.NODE_ENV === 'development' ? '' : 'assets')),
        publicPath: (process.env.NODE_ENV === 'development' ? 'http://localhost:3000/' : '/assets/'),
        filename: "[name].[hash].bundle.js"
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.js?$/,
                exclude: /(node_modules)/,
                loader: "babel-loader",
                options: {
                    cacheDirectory: true,
                    presets:["@babel/preset-env", "@babel/preset-react"]
                }
            },
            {
                test: /\.css$/,
                exclude: /(node_modules)/,
                use: ['style-loader', 'css-loader']
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: './src/index.html',
            filename: (process.env.NODE_ENV === 'development' ? 'index.html' : '../index.html'),
            inject: 'body'
        }),
    ],
    devServer: {
        contentBase: '.',
        hot: true,
        port: 3000,
        host: 'localhost',
        inline: true,
        historyApiFallback: true,
        headers: { "Access-Control-Allow-Origin": "*" }
    }
}