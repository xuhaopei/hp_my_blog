module.exports = {
    productionSourceMap: false,
    chainWebpack: config => {
        if (process.env.use_analyzer) { 
            config
                .plugin('webpack-bundle-analyzer')
                .use(require('webpack-bundle-analyzer').BundleAnalyzerPlugin)
        }
    }
}