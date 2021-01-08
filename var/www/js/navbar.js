var scrollValue = 0;

// check if user can scroll through page:
var hasVerticalScroll = document.body.scrollHeight > document.body.clientHeight;

// Get the computed style of the body element
var cStyle = document.body.currentStyle||window.getComputedStyle(document.body, "");

// Check the overflow and overflowY properties for "auto" and "visible" values
hasVerticalScroll = cStyle.overflow == "visible" 
             || cStyle.overflowY == "visible"
             || (hasVScroll && cStyle.overflow == "auto")
             || (hasVScroll && cStyle.overflowY == "auto");

$(document).ready(function() {
    if (hasVerticalScroll) {
        // can scroll vertically
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
    } else {
        // cannot scroll: automatically display navbar, no animation.
        $(".my-navbar").addClass("sticky");
        $(".my-nav-list").addClass("sticky");
    }
});