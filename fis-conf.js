
//框架基本js css打包路径

fis.match('*', {
  deploy: fis.plugin('local-deliver', {
    to: 'build'
  })
})
//框架基本js css打包路径
fis.set('frame','/static/base');




/**********************开发环境下CSS、JS生产项目需要的路径*****************/
//打包js --BG
  fis.match('/bower_components/(**)', {    //jquery
    release: '${frame}/$1'
  })

//打包js --END


//打包 启用后会把js 引入放入body最后面
fis.match('::packager', {
    postpackager: fis.plugin('loader', {})
})

/**********************生产环境下CSS、JS压缩合并*****************/
fis.media('prod')
    .match('components/**.js', {
        // fis-optimizer-uglify-js 插件进行压缩，已内置
        optimizer: fis.plugin('uglify-js')})
    .match('*.css', {
        // fis-optimizer-clean-css 插件进行压缩，已内置
        optimizer: fis.plugin('clean-css')})
    .match('*.png', {
        // fis-optimizer-png-compressor 插件进行压缩，已内置
        optimizer: fis.plugin('png-compressor')})

