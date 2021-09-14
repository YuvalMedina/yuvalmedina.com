var backgroundUrls = ["https://i.imgur.com/lbDiuiY.jpg","https://i.imgur.com/J8pFim1.jpg","https://i.imgur.com/vhFMJHZ.jpg","https://i.imgur.com/kdUHHPL.jpg"];
var backgroundContainers;

backgroundContainers = document.getElementsByClassName("backgroundcontainer");
fillBackgrounds();

function fillBackgrounds(){
    for(var i = 0; i < backgroundContainers.length; i++){
        backgroundContainers[i].style.backgroundImage = "url('"+backgroundUrls[i]+"')";
        setWidthHeight(backgroundContainers[i],backgroundUrls[i]);
        appear(backgroundContainers[i], 0, 5, 100)
    }
}

function setWidthHeight(container, url){
    var img = new Image();
    img.addEventListener("load", function(){
        var w = this.naturalWidth;
        var h = this.naturalHeight;
        container.style.width = "100%";
        container.style.height = h/w*100+"%";
    });
    img.src = url;
}