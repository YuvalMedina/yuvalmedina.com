var request = new XMLHttpRequest();

var counter = 1;

function loadGlslAnimation(element,url) {
    request.open("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var data = request.responseText;
            console.log('-->' + url + 'data:' + data);
            var scr = '<script id="shader-fs'+counter+'" type="x-shader/x-fragment">'+data+'</script>';
            element.innerHTML = scr;
            counter++;
        }
    }
    request.send();
}