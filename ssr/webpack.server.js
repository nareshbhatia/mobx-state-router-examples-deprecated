const path = require('path');
const nodeExternals = require('webpack-node-externals');

module.exports = {
    entry: './server/index.js',

    target: 'node',

    externals: [nodeExternals()],

    output: {
        path: path.resolve('server-build'),
        filename: 'index.js'
    },

    module: {
        rules: [
            // "url" loader works like "file" loader except that it embeds assets
            // smaller than specified limit in bytes as data URLs to avoid requests.
            {
                test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
                loader: require.resolve('url-loader'),
                options: {
                    limit: 10000,
                    name: 'static/media/[name].[hash:8].[ext]'
                },
            },
            {
                test: /\.css/,
                use: 'css-loader'
            },
            {
                test: /\.js$/,
                use: 'babel-loader'
            }
        ]
    }
};
