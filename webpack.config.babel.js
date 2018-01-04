import path from 'path'
import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'
import ExtractTextPlugin from 'extract-text-webpack-plugin';

var webpackIsomorphicToolsPlugin =
    // webpack-isomorphic-tools settings reside in a separate .js file
    // (because they will be used in the web server code too).
    new WebpackIsomorphicToolsPlugin(require(path.join(__dirname, 'webpack-isomorphic-tools-configuration')))
    // also enter development mode since it's a development webpack configuration
    // (see below for explanation)
        .development();

const config = {
    entry: {
        js: './src/client/index.js'
    },

    output: {
        path: path.join(__dirname, 'src', 'static', 'js'),
        filename: 'bundle.js',
        publicPath: '/'
    },

    module: {
        loaders: [
            {
                loader: 'file-loader',
                options: {
                    name: '[path][name].[ext]?[hash]'
                }
            }
        ],
        rules: [
            {
                test: path.join(__dirname, 'src'),
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.(png|jpg|gif)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 8192
                        }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: 'style-loader',
                    //resolve-url-loader may be chained before sass-loader if necessary
                    use: ['css-loader', 'sass-loader']
                })
            },
            {
                test: /\.json$/,
                loader: 'json-loader'
            }
        ],
        loaders: [
            {
                test: webpackIsomorphicToolsPlugin.regularExpression('images'),
                loader: 'url-loader?limit=10240', // any image below or equal to 10K will be converted to inline base64 instead
            }
        ]
    },
    plugins: [
        webpackIsomorphicToolsPlugin,
        new ExtractTextPlugin('style.css')
    ]
};

export default config