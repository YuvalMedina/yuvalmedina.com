let fragUrls = new Map();
fragUrls['a1'] = 'https://gist.githubusercontent.com/YuvalMedina/947880787357fe8d372c0d17cf1b0dc7/raw/TetrationValueAnimation.frag';

var vertexUrl = "https://gist.githubusercontent.com/YuvalMedina/3c2557a9649316c323c147a4d806aadc/raw/vertex.vert";
var vertexData = null;

var canvases = document.getElementsByTagName("canvas");

var request = new XMLHttpRequest();

request.open("GET", vertexUrl);
request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        var vertexData = request.responseText;
        console.log('-->' + 'vertex' + 'data:' + vertexData);
        for(var i = 0; i < canvases.length; i++){
            loadGlslAnimation(canvases[i]);
        }
    }
}
request.send();

var counter = 1;

function loadGlslAnimation(element) {
    var url = fragUrls[element.id];
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
    var height = element.style.height;
    var width = element.style.width;

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

    var u_resolutionLocation = gl.getUniformLocation(shaderProgram, "u_resolution");
    gl.uniform2f(u_resolutionLocation, width, height);

    gl.useProgram(shaderProgram); 
}

var codecontent = document.getElementsByClassName("content")[0];
appear(codecontent, 0, 5, 100);
appear(document.getElementsByClassName("header")[0], 0, 5, 100);