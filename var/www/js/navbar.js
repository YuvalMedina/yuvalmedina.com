var scrollValue = 0;

$(window).scroll(function(){
    var x = $(this).scrollTop();
    if(x > scrollValue) {
        $(".my-navbar").addClass("sticky");
        $(".my-nav-list").addClass("sticky");
    } else {
        $(".my-navbar").removeClass("sticky");
        $(".my-nav-list").removeClass("sticky");
    }
    scrollValue = x;
});