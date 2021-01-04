var floatElmts;

class floatObj{
    constructor(floatElmt, x, y){
        this.floatElmt = floatElmt;
        this.x = x;
        this.y = y;
    }
}

var xMin;
var xMax;
var yMin;
var yMax;

let floatObjs = [];
window.addEventListener('load', function(){
    floatElmts = document.getElementsByClassName("float");
    for(var i = 0; i < floatElmts.length; i++){
        var elmt = floatElmts[i];
        floatObjs.push(new floatObj(elmt, elmt.offsetLeft, elmt.offsetTop));
    }
    setBoundaries();
    moveFloatObjs();
});

function setBoundaries(){
    var parent = floatElmts[0].parentElement;
    var absOffset = cumulativeOffset(parent);
    var width = parent.offsetWidth;
    var height = parent.offsetHeight;
    xMin = absOffset.left;
    xMax = xMin + width;
    yMin = absOffset.top;
    yMax = yMin + height;
}

function moveFloatObjs(){
    for(var i = 0; i < floatObjs.length; i++){
        var elmt = floatObjs[i].floatElmt;
        var x = floatObjs[i].x;
        var y = floatObjs[i].y;
        xy_noise = noise(x, y);
        var delta = getDelta(x, y, xy_noise);

        var new_x = elmt.offsetLeft + delta.xDelta;
        var new_y = elmt.offsetTop + delta.yDelta;

        floatObjs[i].x = new_x;
        floatObjs[i].y = new_y;
        elmt.style.left = new_x;
        elmt.style.top = new_y;
    }
    setTimeout('moveFloatObjs()',10);
}

function getXDelta(x, y, noise){
    let xDeltas = [];
    let yDeltas = [];
    let choose = 0;
    if(x == xMin && y == yMin){
        xDeltas = [1,1,0];
        yDeltas = [0,1,1];
        choose = floor(noise*3);
    }
    else if(x == xMin && y == yMax){
        xDeltas = [0,1,1];
        yDeltas = [-1,-1,0];
        choose = floor(noise*3);
    }
    else if(x == xMax && y == yMin){
        xDeltas = [-1,-1,0];
        yDeltas = [0,1,1];
        choose = floor(noise*3);
    }
    else if(x == xMax && y == yMax){
        xDeltas = [-1,-1,0];
        yDeltas = [0,-1,-1];
        choose = floor(noise*3);
    }
    else if(x == xMin){
        xDeltas = [0,1,1,1,0];
        yDeltas = [-1,-1,0,1,1];
        choose = floor(noise*5);
    }
    else if(x == xMax){
        xDeltas = [0,-1,-1,-1,0];
        yDeltas = [-1,-1,0,1,1];
        choose = floor(noise*5);
    }
    else if(y == yMin){
        xDeltas = [-1,-1,0,1,1];
        yDeltas = [0,1,1,1,0];
        choose = floor(noise*5);
    }
    else if(y == yMax){
        xDeltas = [-1,-1,0,1,1];
        yDeltas = [0,-1,-1,-1,0];
        choose = floor(noise*5);
    }
    else{
        xDeltas = [1,1,1,0,-1,-1,-1,0];
        yDeltas = [-1,0,1,1,1,0,-1,-1];
        choose = floor(noise*8);
    }
    return {
        xDelta : xDeltas[choose],
        yDelta : yDeltas[choose]
    };
}

function cumulativeOffset(element) {
    var top = 0, left = 0;
    do {
        top += element.offsetTop  || 0;
        left += element.offsetLeft || 0;
        element = element.offsetParent;
    } while(element);

    return {
        top: top,
        left: left
    };
};