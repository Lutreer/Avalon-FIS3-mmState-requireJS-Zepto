define(function(){
    var vm = avalon.define({
        $id: "nav-left-vm",
        aa: 'dgdasgdasgfasg',
        navLeftInfo: {
            navArr:[
                {
                    name:'首页',hash:'/#!left-nav-1',active:false,permission:'LEFT-MENU-1',children:[]
                },
                {
                    name:'展开菜单-1',toggle:false,permission:'LEFT-MENU-2-AB',
                    children:[
                        {name:'联系人',hash:'/#!left-nav-2-a',active:true,permission:'LEFT-MENU-2-A',children:[]},
                        {name:'关于',hash:'/#!left-nav-2-b',active:false,permission:'LEFT-MENU-2-B',children:[]}
                    ]
                },
                {
                    name:'展开菜单-2',toggle:true,permission:'LEFT-MENU-2-AB',
                    children:[
                        {name:'联系人-1',hash:'/#!left-nav-2-a',active:false,permission:'LEFT-MENU-2-A',children:[]},
                        {name:'关于-2',hash:'/#!left-nav-2-b',active:false,permission:'LEFT-MENU-2-B',children:[]}
                    ]
                }
            ]
        },
        toggleNavs: function(vmEl,ele){
            var ele = ele;
            if(!vmEl.toggle){
                $(ele).next('ul').slideDown(150,function(){
                    vmEl.toggle = !vmEl.toggle
                });

            }else{
                $(ele).next('ul').slideUp(150,function(){
                    vmEl.toggle = !vmEl.toggle
                });
            }
        },
        navActive: function(vmEl) {

            recursion(vm.navLeftInfo.navArr);

            function recursion(navArr){
                $.each(navArr,function(index,item){
                    item.active = false;
                    if(item.children.length > 0){
                        recursion(item.children);
                    }
                })
            }
            vmEl.active = true;
        },
        scan: function(){
            avalon.scan(document.getElementById("nav-left-vm"),vm);
        }
    });

    return {
        scan: vm.scan
    }
 
    
});
