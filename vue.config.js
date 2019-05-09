module.exports = {
  devServer: {
    // proxy: {
    //   '/api': {
    //     target: 'http://localhost/cakephp',
    //     ws: true,
    //     changeOrigin: true
    //   }
    // }
    proxy: 'http://localhost/cakephp'

  }
}
