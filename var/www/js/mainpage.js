var floatElmts;

class floatObj{
    constructor(floatElmt, x, y){
        this.floatElmt = floatElmt;
        this.x = x;
        this.y = y;
        this.direction = Math.floor(Math.random()*8);
    }
}

var xMin=0;
var xMax;
var yMin;
var yMax;
var moveby = 1;

let floatObjs = [];
window.addEventListener('load', function(){
    floatElmts = document.getElementsByClassName("float");
    for(var i = 0; i < floatElmts.length; i++){
        var elmt = floatElmts[i];
        floatObjs.push(new floatObj(elmt, elmt.offsetLeft, elmt.offsetTop));
    }
    setBoundaries();
    positionTZero();
    moveFloatObjs();
});

function setBoundaries(){
    var parent = floatElmts[0].parentElement;
    var absOffset = cumulativeOffset(parent);
    var width = parent.offsetWidth;
    var height = parent.offsetHeight;
    xMax = xMin + width;
    yMin = absOffset.top;
    yMax = yMin + height;
}

function positionTZero(){
    for(var i = 0; i < floatObjs.length; i++){
        var elmt = floatObjs[i].floatElmt;
        var x = Math.random()*(xMax-xMin)+xMin;
        var y = Math.random()*(yMax-yMin)+yMin;
        
        elmt.style.left = x+"px";
        elmt.style.top = y+"px";
        floatObjs[i].x = x;
        floatObjs[i].y = y;
    }
}

function moveFloatObjs(){
    for(var i = 0; i < floatObjs.length; i++){
        var elmt = floatObjs[i].floatElmt;
        var x = floatObjs[i].x;
        var y = floatObjs[i].y;
        var direction = floatObjs[i].direction;
        noise = Math.random();
        var delta = getDelta(x, y, noise, direction);

        var new_x = elmt.offsetLeft + delta.xDelta*moveby;
        var new_y = elmt.offsetTop + delta.yDelta*moveby;
        var new_dir = delta.direction;

        floatObjs[i].x = new_x;
        floatObjs[i].y = new_y;
        floatObjs[i].direction = new_dir;
        elmt.style.left = new_x+"px";
        elmt.style.top = new_y+"px";
    }
    setTimeout('moveFloatObjs()',10);
}

function getDelta(x, y, noise, direction){
    let xDeltas = [];
    let yDeltas = [];
    let change = noise<0.5? -1 : 1;
    let choose = 0;
    if(x <= xMin+moveby && y <= yMin+moveby){
        xDeltas = [1,1,0];
        yDeltas = [0,1,1];
        choose = direction+change % 3;
    }
    else if(x <= xMin+moveby && y >= yMax-moveby){
        xDeltas = [0,1,1];
        yDeltas = [-1,-1,0];
        choose = direction+change % 3;
    }
    else if(x >= xMax-moveby && y <= yMin+moveby){
        xDeltas = [-1,-1,0];
        yDeltas = [0,1,1];
        choose = direction+change % 3;
    }
    else if(x >= xMax-moveby && y >= yMax-moveby){
        xDeltas = [-1,-1,0];
        yDeltas = [0,-1,-1];
        choose = direction+change % 3;
    }
    else if(x <= xMin+moveby){
        xDeltas = [0,1,1,1,0];
        yDeltas = [-1,-1,0,1,1];
        choose = direction+change % 5;
    }
    else if(x >= xMax-moveby){
        xDeltas = [0,-1,-1,-1,0];
        yDeltas = [-1,-1,0,1,1];
        choose = direction+change % 5;
    }
    else if(y <= yMin+moveby){
        xDeltas = [-1,-1,0,1,1];
        yDeltas = [0,1,1,1,0];
        choose = direction+change % 5;
    }
    else if(y >= yMax-moveby){
        xDeltas = [-1,-1,0,1,1];
        yDeltas = [0,-1,-1,-1,0];
        choose = direction+change % 5;
    }
    else{
        xDeltas = [1,1,1,0,-1,-1,-1,0];
        yDeltas = [-1,0,1,1,1,0,-1,-1];
        choose = direction+change % 8;
    }
    return {
        xDelta : xDeltas[choose],
        yDelta : yDeltas[choose],
        direction : choose
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