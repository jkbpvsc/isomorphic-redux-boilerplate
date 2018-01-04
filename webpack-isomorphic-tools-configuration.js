import WebpackIsomorphicToolsPlugin from 'webpack-isomorphic-tools/plugin'

export default {
    debug: false,
    assets: {
        images: {
            extensions: ['png', 'jpg', 'gif', 'ico', 'svg']
        },
        style_modules: {
            extensions: ['less', 'scss', 'css'],
        }
    }
}