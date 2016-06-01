define([], function() {
    var vm = avalon.define({
        $id: "error",
        headerTitle: "身份认证失败",
        httpStatusCode: 404,

        init: function() {
            avalon.scan();

        },
        setHttpStatusCode: function(code) {
            vm.httpStatusCode = code;
        }
    });


    return avalon.controller(function($ctrl) {
        // 视图渲染后，意思是avalon.scan完成
        $ctrl.$onRendered = function() {
        };
        // 进入视图
        $ctrl.$onEnter = function(param, rs, rj) {
            vm.init();
        };
        // 对应的视图销毁前
        $ctrl.$onBeforeUnload = function() {

        };
        $ctrl.$vmodels = [vm];
    })



});