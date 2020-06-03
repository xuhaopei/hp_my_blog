module.exports = {
    module:{
        rules:[
            // 此种方法在控制台中标签样式显示的是style标签样式
            { 
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",
            },
                // 可以在控制台中看到当前标签样式来自于哪个less文件
            { 
                test: /\.less$/,
                loader: "style-loader!css-loader!less-loader",           　　
            　　 options: { sourceMap: true }
            }
        ]
    },
    configureWebpack: {
        resolve: {
            alias: {
                //配置别名
                'assets': '@/assets',
                'common': '@/common',
                'components': '@/components',
                'network': '@/network',
                'views': '@/views',
                'pluginunit':'@/pluginunit'
            }
        }
    },
    devServer: {
        host: '192.168.1.6',  //本机电脑 ip 地址
        port: 8080,  //端口号
    }
}