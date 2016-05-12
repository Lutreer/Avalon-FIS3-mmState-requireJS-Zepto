/*require(['./common/menu/menu-left-vm',
    '/lib/avalon/mmState',
    './common/header/header-vm'],
    function(leftMenu){
    debugger
    leftMenu.init();
    var vm = avalon.define({
        $id: "view-main-vm",
        menuLeft: [
            {name:'首页',hash:'/#!aaa'},
            {name:'联系人',hash:'/#!bbb'}
        ]
    });

    avalon.state("aaa", {
        url: "/aaa",
        views: {
            "": {
                template: "<div>2222</div>"
            }
        }
    }).state("bbb", {
        url: "/bbb",
        views: {
            "": {
                template: "<div>2222<div ms-view=''></div></div>"
            }
        }
    }).state("aaa.son", {
        url: "/:bbb",
        views: {
            "": {
                template: "这是子级{{args}}"
            }
        },
        onEnter: function (a) {
            vm.args = a
        }
    }).state("bbb.son", {
        url: "/:bbb",
        views: {
            "": {
                templateProvider: function () {
                    return new Promise(function (rs) {
                        require.ensure([], function (tt) {
                            rs(require("text!./statetemp.html"))
                        })
                    })
                }
            }
        },
        onEnter: function (a) {
            vm.args = a
        }
    })
    avalon.history.start();
    avalon.router.navigate("aaa") //默认打开aaa状态
     
    avalon.scan(document.body);
});
*/