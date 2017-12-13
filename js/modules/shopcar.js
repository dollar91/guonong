define(function(require ,exports ,module){
    require('public');
    require('plugins')($);

    $("#nums").gnNums({default:1,max:10,min:1});
    //购物车物品选择
    var gnShopCar = function (){
        this.dialog = null;
        this.select();
        this.edit();
        // return this;
    };
    gnShopCar.prototype = {
        constructor : gnShopCar,
        select : function(e){
            $(".goods-select").on('tap',function(e){
                $(this).toggleClass('selected');
                e.stopPropagation();
                //others function
            })
        },
        edit : function(){
            var _this = this;
            var editBoxHtml = '<div class="edit-box">\
                                <div class="edit-img-outer">\
                                    <img class="edit-img" src="images/goods1.jpg">\
                                </div>\
                                <div class="other-infos center">\
                                    <p class="goods-name">黄金奇异果</p>\
                                    <p class="goods-price">28.8元/500克</p>\
                                </div>\
                                <div class="buy-outer">\
                                    <div class="add-outer" id="nums">\
                                        <a href="javascript:;" class="minus-btn">-</a>\
                                        <span class="buy-num">6</span>\
                                        <a href="javascript:;" class="add-btn">+</a>\
                                    </div>\
                                    <div class="shopcar-outer2">\
                                        <a href="javascript:;" class="shopcar-add-btn" id="addShopCar">确定</a>\
                                    </div>\
                                </div>\
                                <a href="###" class="dialog-close"></a>\
                                <a href="###" class="dialog-delete"></a> \
                                </div>'
            $(".edit-icon").on('tap',function(){
                _this.dialog = new gnDialog({
                    text:editBoxHtml,
                    close: false,
                    width:'250px',
                    height:'275px'
                });
                _this.delete();
                _this.changeNUm();
            })

        },
        delete : function(){
            var _this = this;
            $(".dialog-delete").on('tap',function(){
                _this.dialog.close();
            });
        },
        changeNUm : function(){
            $("#nums").gnNums({default:7});

        },
        endMoney : function(){

        }
    }
    new gnShopCar();
});
