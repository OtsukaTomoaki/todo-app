const path = require('path');

module.exports = {
    mode: 'development',

    entry: `./src/index.js`,

    output: {
        filename: "app.js",
        path: path.join(__dirname, 'build', 'assets')
    },
    module: {
        rules: [
            { 
                test: /\.js$/, 
                exclude: /node_modules/, 
                loader: 'babel-loader' 
            },
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader'],
            }
        ]
    }
};