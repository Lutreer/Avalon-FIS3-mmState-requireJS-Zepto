/**
 * Created by Leasong on 2016/5/23.
 */
// global state.config
avalon.state.config({
    onBeforeUnload: function(from, to) {
        // get params form url when enter from native app
        if (to && to.stateName != 'error' && (!from || from.stateName != to.stateName)) {
            var token = utils.getParamByName("token"),
                userCode = utils.getParamByName("userCode");
            if (!token || !userCode) {
                return false;
            } else {
                // set the authorized information about current user
                session.setApiAuthInfo({
                    token: token,
                    userCode: userCode
                })
            }

        }
        //reserve
        //headerVM.changeHeader(to.headerTitle, to.stateName, to.headerRightFn)
    },
    onAbort: function(from, to) {
        avalon.router.go("error", {}, {
            replace: true,
            reload: true
        })
    },
    onBegin: function(from, to) {},
    onLoad: function(from, to) {
        $.init()
    },
    onError: function(keyname, state) {
        avalon.router.go("error", {}, {
            replace: true,
            reload: true
        })
    },
    onViewEnter: function(newNode, oldNode) {}
});

//router base on state
avalon.state("bindRoomType", {
        url: "/bindRoomType",
        //headerTitle: "绑定房型",
        //headerRightFn: "syncBindRoomType",
        templateUrl: __uri("/modules/bindRoomType/bind-room-type.html"),
        controller: bindRoomTypeCtrl,
        onBeforeEnter: function() {
            if (!utils.getParamByName("innId")) {
                return false;
            }
        }


        //controllerUrl: "modules/bindRoomType/bind-room-type-ctrl"
        //其他加载 controller 方法(unsync loader)，需要重写 mmState 中的controller.loader配合使用
        /*controllerUrl: __uri("/modules/bindRoomType/bind-room-type-ctrl")
         controllerProvider:function(){
         var controller = new Promise(function(rs, callback, errorcallback) {
         require([__uri("/modules/bindRoomType/bind-room-type-ctrl.js")], function($ctrl) {
         rs($ctrl)
         })
         })
         return controller

         }*/
    })
    .state("priceInfo", {
        url: "/priceInfo",
        templateUrl: __uri("/modules/priceInfo/price-info.html"),
        controller: priceInfoCtrl,
        onBeforeEnter: function() {
            if (!utils.getParamByName("recordCode") || !utils.getParamByName("innId")) {
                return false;
            }
        }
    })
    .state("consignmentDetail", {
        url: "/consignmentDetail",
        templateUrl: __uri("/modules/consignment/consignment-detail.html"),
        controller: consignmentDetailCtrl,
        onBeforeEnter: function() {
            if (!utils.getParamByName("innId") || !utils.getParamByName("appKey")) {
                return false;
            }
        }
    })
    .state("error", {
        url: "/error",
        templateUrl: __uri("/modules/common/error/error.html"),
        controller: errorCtrl
    });

avalon.history.start({});

avalon.router.errorback = function() {
    avalon.router.go("error", {}, {
        replace: true,
        reload: true
    })
}

//avalon.router.navigate("/error"); //默认打开状态

//avalon.scan(document.body,vm);