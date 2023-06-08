const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");
const webpack = require("webpack");

const srcDir = path.resolve(__dirname, "src");


module.exports = (env, options) => {
    const mode = options.mode || 'development'
    const masterURL = mode == 'production' ? '/' : 'http://127.0.0.1:3000/';

    const config = {
        entry: [path.resolve(srcDir, "index.js")],
        mode,
        output: {
            path: path.resolve(__dirname, mode == "production" ? 'public' : 'dist'),
            filename: 'main.js',
            publicPath: masterURL
        },

        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-env']
                        }
                    }
                },
                {
                    test: /\.html$/,
                    loader: "html-loader"
                },
                {
                    test: /\.css$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        "css-loader"
                    ]
                },
                {
                    test: /\.(jpg|png|gif|svg|mp3)$/,
                    use: {
                        loader: "file-loader",
                        options: {
                            name: "assets/[name].[ext]?[hash]"
                        }
                    }
                },
            ]
        },

        plugins: [
            new webpack.ProvidePlugin({
                THREE: 'three/build/three'
            }),
            new MiniCssExtractPlugin({
                filename: "assets/style.css",
            }),
            new HtmlWebpackPlugin({
                template: path.resolve(srcDir, "html", "index.html"),
                filename: "index.html",
            })
        ],

        resolve: {
            extensions: [".js"]
        }
    };

    return config;
}