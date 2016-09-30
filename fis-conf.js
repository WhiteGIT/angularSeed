// 配置按需编译：设置编译范围为 html 文件，不过 html 文件中使用到的资源也会参与编译。
//fis.set('project.files', ['app/frame/**','app/modules/**']);
fis.set('project.ignore', ['buildBAK/**','TEST/**','node_modules/**','fis-conf.js','app/bower_components/**',"package.json"]);
//框架基本js css打包路径
fis.set('frame','app/static/base');

//全局或本地安装插件
    //npm install [-g] fis3-hook-relative
    fis.hook('relative');
    //开启相对路径
    fis.match('**', { relative: true });

/**********************开发环境下CSS、JS生产项目需要的路径*****************/
//打包js --BG
  fis.match('bower_components/(**)', {
    release: '${frame}/$1'
  })

//打包js --END


//打包 启用后会把js 引入放入body最后面
fis.match('::packager', {
    postpackager: fis.plugin('loader', {})
})

//框架基本js css打包路径
fis.match('*', {
    deploy: fis.plugin('local-deliver', {
        to: 'build'
    })
})
fis.match('*.css',{
    useHash:true
})

//JS加了MD5后，需要先解决Oclazyload 文件加载不到
fis.match('*.js',{
    useHash:true
})

/**********************生产环境下CSS、JS压缩合并*****************/
fis.media('prod')
        //模块化处理
        //npm install [-g] fis3-hook-module
    .hook('module', {
            mode: 'mod'})

    .match("app/{frame,modules}/**.js", {
            isMod: true,
            wrap:false,
            //angular注入依赖自动补上别名  需要开启模块化
            preprocessor: fis.plugin('annotate')})

     .match('app/**.js', {
        // fis-optimizer-uglify-js 插件进行压缩，已内置
            optimizer: fis.plugin('uglify-js')})

    .match('app/**.css', {
        // fis-optimizer-clean-css 插件进行压缩，已内置
        optimizer: fis.plugin('clean-css')})
    .match('app/**.png', {
        // fis-optimizer-png-compressor 插件进行压缩，已内置
        optimizer: fis.plugin('png-compressor')})

    .match("{bower_components/jquery/dist/jquery.js," +
            "bower_components/angular/angular.js," +
            "bower_components/angular-ui-router/release/angular-ui-router.js," +
             "bower_components/angular-loading-bar/src/loading-bar.js," +
             "bower_components/angular-animate/angular-animate.js," +
             "bower_components/oclazyload/dist/ocLazyLoad.js," +
             "frame/app.js}",
            {
                packTo:'app/static/com.js'
            })
   
    .match("{bower_components/bootstrap/dist/css/bootstrap.css," +
        "frame/css/angular-motion.css," +
        "bower_components/angular-loading-bar/src/loading-bar.css," +
        "frame/css/**.css}",
        {
            packTo:'app/static/com.css'
        })
    //合并时候 angular放最前面
    .match('angular.*', {
        packOrder: -100
    })
