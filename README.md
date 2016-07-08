# webapp-crm

帮助
===

 项目打包基于fis3，所以首先安装fis3 `npm install fis3 -g`，当然，要先安装node；

## 插件安装

* `npm install fis3-hook-amd -g`

* `npm install fis3-parser-node-sass -g`

* `npm install fis3-postpackager-loader -g`


## 本地开发

1. 启动服务 `fis3 server start`,默认端口8080；
2. 项目编译 `fis3 release -wL`,监听自动加载；不压缩混淆；
3. 需开启nginx代理，避免跨域问题；

## 本地测试

1. 启动服务 `fis3 server start`,默认端口8080；
2. 项目编译 `fis3 release lqa -wL`,监听自动加载；同发布命令，含压缩混淆；
3. 需开启nginx代理，避免跨域问题；

## 发布上线

* 编译打包 `fis3 release prod -d ./webapp-crm`
* 是否发布成功 `http://crm.afanqie.com/webapp/index.html#!/error`

## 淘宝镜像

cnpm代替npm
`npm install -g cnpm --registry=https://registry.npm.taobao.org`

安装模块
`cnpm install [name]`
> eg. `cnpm install fis-parser-node-sass -g`


