var buttons = document.getElementsByClassName('title');
var i;

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var videoId = 'v' + this.id.substring(1);
        var content = document.getElementById(videoId);
        var videoObjects = content.children;
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = 315 + "px";
        }
        for(var i = 0; i < videoObjects.length; i++){
            var element = videoObjects[i];
            if (element.style.maxHeight){
                element.style.maxHeight = null;
            } else {
                element.style.maxHeight = 315 + "px";
            }
        }
    });
};