module.exports = {
    transpileDependencies: ["vuetify"],
    devServer: {
        proxy: 'http://localhost:8080/',
    },
    publicPath: process.env.NODE_ENV === 'production' ?
        '/lukuma/' : '/'
};