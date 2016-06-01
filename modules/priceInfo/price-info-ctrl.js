define(["./price-info-service",
    "/modules/common/utils/base.js"
], function(service, baseUtils) {
    var vm = avalon.define({
        $id: "price-info",
        recordCode: baseUtils.getParamByName("recordCode"),
        innId: baseUtils.getParamByName("innId"),
        priceInfo: {},
        init: function() {
            getPageInfo();
        }

        //header 右侧按钮作用
        //headerRightFn: function(){}
    });


    /**
     * 初始化 获取房价信息 & 确认已解决
     */
    function getPageInfo() {
        var isFromHeader = baseUtils.getParamByName("isFromHeader");
        service.getPriceInfo({
                innId: vm.$model.innId
            }).done(function(data) {
                if (data.status == 200) {
                    vm.priceInfo = data;
                    avalon.scan();
                    if (isFromHeader && isFromHeader === "1") {
                        var submitData = {
                            recordCode: vm.$model.recordCode
                        }
                        service.resolveDiffer(submitData).done(function(data) {
                                if (data.status == 200) {
                                    $.toast("操作成功", 800);
                                } else {
                                    $.toast(data.message, 800);
                                }
                            })
                            .fail(function() {
                                $.toast("操作失败", 800);
                            })
                            .always(function() {

                            });
                    }

                } else {
                    avalon.router.go("error", {}, {
                        reload: true
                    })
                }
            })
            .fail(function() {
                avalon.router.go("error", {}, {
                    reload: true
                })

            })
            .always(function() {});

    }

    return avalon.controller(function($ctrl) {
        $ctrl.$onRendered = function() {

        };
        $ctrl.$onEnter = function(param, rs, rj) {
            vm.init();
        };
        $ctrl.$onBeforeUnload = function() {

        };
        $ctrl.$vmodels = [vm];
    })

});