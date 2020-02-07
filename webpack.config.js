const path = require('path');

module.exports = {
    entry: './resources/js/app.js',
    output: {
        filename: './public/javascripts/bundle.js',
    },
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        },
        extensions: ['*', '.js', '.vue', '.json']
    },
    module: {
        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.s[a|c]ss$/,
                loader: 'style!css!sass'
            }
        ],
        vue: {
            loaders: {
              scss: 'style!css!sass'
            }
        }
    }
};