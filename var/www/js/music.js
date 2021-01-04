var buttons = document.getElementsByClassName('title');
var i;

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var videoId = 'v' + this.id.substring(1);
        var content = document.getElementById(videoId);
        var videoObjects = content.children;
        // videos that are displayed at first will have a different transition from expanded to collapsed.
        var displayfirst = content.getAttribute("title") == "displayfirst";
        if (content.style.maxHeight){
            content.style.maxHeight = null;
        } else {
            if(displayfirst){
                content.style.maxHeight = 0 + "px";
            }
            else{
                content.style.maxHeight = 315 + "px";
            }
        }
        for(var j = 0; j < videoObjects.length; j++){
            var element = videoObjects[j];
            if (element.style.maxHeight){
                element.style.maxHeight = null;
            } else {
                if(displayfirst){
                    element.style.maxHeight = 0 + "px";
                }
                else{
                    element.style.maxHeight = 315 + "px";
                }
            }
        }
    });
};