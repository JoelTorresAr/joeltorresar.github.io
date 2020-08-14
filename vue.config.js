module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: 'http://192.168.0.2',
        port: '7000'
    },
    publicPath: process.env.NODE_ENV === 'production' ?
        '/lukuma/' : '/'
};