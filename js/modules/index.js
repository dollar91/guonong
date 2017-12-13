define(function(require ,exports ,module){
    require('public');
    require('swiper');
    require('plugins')($);

    /*banner*/
    var slider = new Swiper('.swiper-container', {
        pagination: '.pagination',
        loop:true,
        grabCursor: true,
        paginationClickable: true
    });
    $.lazyload();
});
