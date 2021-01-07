if(window.mobileAndTabletCheck() == true){
    var regUrl = window.location.href;
    var mobileUrl = getMobileUrl(regUrl);
    console.log("redirect");
    window.location.replace(mobileUrl);
}

function getMobileUrl(regUrl){
    var ind = regUrl.indexOf(".com/");
    if(ind == -1) {
        if(regUrl.indexOf(".com") >= 0){
            return regUrl + "/mobile";
        }
        return regUrl;
    } else {
        var domain = regUrl.substring(0,ind+5);
        var subdomain = regUrl.substring(ind+5);
        return domain + "mobile/" + subdomain;
    }
}