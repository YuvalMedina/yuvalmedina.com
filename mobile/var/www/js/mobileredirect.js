if(window.mobileAndTabletCheck() == false){
    var mobileUrl = window.location.href;
    var regUrl = getRegUrl(mobileUrl);
    console.log("redirect");
    window.location.replace(regUrl);
}

function getRegUrl(mobileUrl){
    var ind = mobileUrl.indexOf(".com/");
    var domain = mobileUrl.substring(0,ind+5);
    // subdomain without "mobile/"
    var subdomain = mobileUrl.substring(ind+12);
    return domain + subdomain;
}