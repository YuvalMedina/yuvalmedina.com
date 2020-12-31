var vertexUrl = "https://gist.githubusercontent.com/YuvalMedina/3c2557a9649316c323c147a4d806aadc/raw/d5b27cae9abefda87c0ef7d025978100f731a9c0/vertex.vert";
var vertexData = null;

var request = new XMLHttpRequest();

request.open("GET", vertexUrl);
request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        var vertexData = request.responseText;
        console.log('-->' + 'vertex' + 'data:' + vertexData);
    }
}
request.send();

var counter = 1;

function loadGlslAnimation(element,url) {
    request.open("GET", url);
    request.onreadystatechange = function() {
        if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
            var data = request.responseText;
            console.log('-->' + url + 'data:' + data);
            var scrId = '"shader-fs'+counter+'"';
            var scr = '<script id='+scrId+' type="x-shader/x-fragment">'+data+'</script>';
            element.innerHTML = scr;
            counter++;
            startup(element, data);
        }
    }
    request.send();
}

function startup(element, data){
    var glCanvas = element;
    var gl = glCanvas.getContext("webgl");
    var shaderProgram = gl.createProgram();

    var fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    gl.shaderSource(fragShader, data);
    gl.compileShader(fragShader);

    var vertexShader = gl.createShader(gl.VERTEX_SHADER);
    gl.shaderSource(vertexShader, vertexData);
    gl.compileShader(vertexShader);

    gl.attachShader(shaderProgram, fragShader);
    gl.attachShader(shaderProgram, vertexShader);
    gl.linkProgram(shaderProgram);
    gl.useProgram(shaderProgram); 
}