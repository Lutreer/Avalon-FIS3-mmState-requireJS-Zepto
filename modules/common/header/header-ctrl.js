define([],function(){
    var vm = avalon.define({
        $id: "header",
        headerTitle:"番茄来了",
        currentState:"",
        rightFn:"DEFAULT-HEADER-RIGHT",

        scan: function() {
            vm.scan($("#header"),vm);
        },
        changeHeader:function(newTitle,newState,newRightFn){
            vm.headerTitle = newTitle;
            vm.currentState = newState;
            vm.rightFn = newRightFn;
        }
    });


    return {
        init: vm.scan,
        changeHeader:vm.changeHeader
    }
 
    
});
