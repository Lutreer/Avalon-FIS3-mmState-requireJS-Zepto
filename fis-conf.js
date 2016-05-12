//fis3-postpackager-loader
fis.match('::packager', {
    spriter: fis.plugin('csssprites'),
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        useInlineMap: true,
        allInOne: true
    })
});

fis.match('*.{js,css,png,scss,vm}', {
    useHash: true
});

fis.match('**.vm', {
    rExt: '.js',
    isJsLike: true    
});
/*fis.match('*.js', {
    optimizer: fis.plugin('uglify-js')
});*/
/*fis.match('some big file', {
  skipDepsAnalysis: true
});*/



fis.match('*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass')
});

fis.match('*.{css,scss}', {
    useSprite: true,
    optimizer: fis.plugin('clean-css')
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

//fis3-hook-amd
fis.hook('amd', {
    paths: {
        jQuery: '/lib/jquery/jquery.js',
        avalon: "/lib/avalon/avalon.js",
        bootstrap: "/lib/bootstrap/bootstrap.js"
    },
    shim: {
        jQuery: {
            exports: "jQuery"
        },
        avalon: {
            exports: "avalon"
        },
        bootstrap: {
            deps: ['jQuery'],
            exports: "bootstrap"
        }
    },
    //忽略标记依赖文件
    /*ignoreDependencies: [
      'avalon/avalon-1.5.5'
    ]*/
    mode: 'amd',
    //全局引用
    globalAsyncAsSync: true
});
