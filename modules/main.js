require(['/lib/avalon/mmState',
        'Zepto',
        '/lib/sui/sm',
        '/modules/bindRoomType/bind-room-type-ctrl',
        '/modules/priceInfo/price-info-ctrl',
        './static/js/session',
        '/modules/common/utils/base',
        '/modules/common/error/error-ctrl',
        '/modules/consignment/consignment-detail-ctrl'
    ],
    function(mmState, $, sm, bindRoomTypeCtrl, priceInfoCtrl, session, utils, errorCtrl, consignmentDetailCtrl) {
        //avalon base config
        avalon.config({
            //debug: true,
            debug: false,
            loader: false //disable avalon's amd loader
        });


        //root VM
        var vm = avalon.define({
            $id: "app",

            //如果需要 header 则放开
            /*headerRightTouch: function(headerRightFn,obj) {
                vm.headerRightTouch.caller
                switch (headerRightFn) {
                    case 'syncBindRoomType'://绑定房型-同步
                    bindRoomTypeCtrl.$vmodels[0].headerRightFn();
                    //some code
                    break;
                    case 'resolvePriceInfo'://价格信息-已解决
                    alert(2)
                    //some code
                    break;
                }
            }*/
        });

        __inline("modules/static/js/avalon-route.js")
        __inline("modules/static/js/avalon-filter.js")

    });