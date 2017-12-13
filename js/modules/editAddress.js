define(function(require ,exports ,module){
    require('public');
    require('plugins')($);
    $("#editAddressBtn").on('tap',function(){
        var str = '<div class="edit-back-text">OMG,好像忘记填什么了</div>\
                <div class="edit-back"><a href="###">再检查看看</a> </div>';
        var menuDialog = $.gnDialog({
            text:str,
            close:false
        });
        $(".edit-back").on('tap',function(){
            menuDialog.close();
        })
    });
})