fis.set('project.ignore', ['node_modules/**', 'output/**', '.git/**', 'fis-conf.js', '*.log', 'dist/**', 'nginx.conf']);

//fis3-postpackager-loader
fis.match('::packager', {
    spriter: fis.plugin('csssprites'),
    postpackager: fis.plugin('loader', {
        resourceType: 'amd',
        allInOne: false,
        useInlineMap: true
    })
});
fis.match('*.{js,css,png,scss,html}', {
    useHash: true
});
fis.match('index.html', {
    useHash: false
});


fis.match('*.scss', {
    rExt: '.css',
    parser: fis.plugin('node-sass')
});
/*fis.match('*.less', {
    rExt: '.css',
    parser: fis.plugin('less')
});*/

fis.match('*.{css,scss}', {
    optimizer: fis.plugin('clean-css'),
    useSprite: true
});

fis.match('*.png', {
    optimizer: fis.plugin('png-compressor')
});

//fis3-hook-amd
fis.hook('amd', {
    paths: {
        Zepto: '/lib/zepto/zepto.js',
        avalon: "/lib/avalon/avalon.js"
    },
    shim: {
        Zepto: {
            exports: "Zepto"
        },
        avalon: {
            exports: "avalon"
        }
    },
    //忽略标记依赖文件
    /*ignoreDependencies: [
      'avalon/avalon-1.5.5'
    ]*/
    mode: 'amd',
    globalAsyncAsSync: true
});

//local-qa
fis.media('lqa').match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: true
        })
    })
    .match('*.js', {
        optimizer: fis.plugin('uglify-js')
    });

//qa production
fis.media('prod').match('::packager', {
        postpackager: fis.plugin('loader', {
            allInOne: true
        })
    })
    .match('*.js', {
        optimizer: fis.plugin('uglify-js')
    })
    .match('*', {
        url: '/webapp$0'
    });