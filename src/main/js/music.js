var buttons = document.getElementsByClassName("title");
var i;

for (i = 0; i < buttons.length; i++) {
  buttons[i].addEventListener("click", function() {
    this.classList.toggle("active");
    var videoId = 'v' + this.id;
    var content = document.getElementById(videoId);
    var videoObjects = content.children;
    videoObjects.array.forEach(element => {
        if (element.style.maxHeight){
            element.style.maxHeight = null;
        } else {
            element.style.maxHeight = 315 + "px";
        }
    });
  });
};