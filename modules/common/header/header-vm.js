define([],function(){
    var vm = avalon.define({
        $id: "header-vm",
        headerInfo: {
            brand:'Tomato',
            menuArr:[
                {
                    name:'首页',path:'/index',active:false,permission:'INDEX'
                },
                {
                    name:'首页',path:'HAS_CHILDREN',toggle:false,permission:'OTHERS-AB',
                    children:[
                        {name:'',path:'/others-a',active:false,permission:'OTHERS-B'},
                        {name:'',path:'/others-b',active:false,permission:'OTHERS-A'}
                    ]
                }
                
            ]
        }
    });

    return {
        init: function(){
            vm.scan
        }
    }
 
    
});
