var floatElmts;

class delta{
    constructor(x,y){
        this.x = x;
        this.y = y;
    }
}

var xDeltas = [1,1,1,0,-1,-1,-1,0];
var yDeltas = [-1,0,1,1,1,0,-1,-1];

class floatObj{
    constructor(floatElmt,direction){
        this.floatElmt = floatElmt;
        this.direction = direction;
    }
}

let deltas = [];

for(var i = 0; i < xDeltas.length; i++){
    var myDelta = new delta(xDeltas[i],yDeltas[i]);
    deltas.push(myDelta);
}

var xMin=0;
var xMax;
var yMin;
var yMax;
var moveBy = 1;
var drawing = false;

let floatObjs = [];
window.addEventListener('load', function(){
    floatElmts = document.getElementsByClassName("float");
    for(var i = 0; i < floatElmts.length; i++){
        var elmt = floatElmts[i];
        var direction = randomNum(0,deltas.length);
        var obj = new floatObj(elmt, direction);
        floatObjs.push(obj);
    }
    startup();
    // redraw elements if window was resized
    if(window.attachEvent) {
        window.attachEvent('onresize', redraw);
    }
    else if(window.addEventListener) {
        window.addEventListener('resize', redraw, true);
    }
    // stop elements from moving upon hover
    for(var i = 0; i < floatElmts.length; i++){
        var elmt = floatElmts[i];
        elmt.addEventListener('mouseenter', stopmoving);
        elmt.addEventListener('mouseleave', startmoving);
    }
});

function stopdrawing(timeout){
    drawing = false;
    setTimeout('startmoving()', timeout);
}

function stopmoving(){
    drawing = false;
}

function startmoving(){
    drawing = true;
    moveFloatObjs();
}

function startup(){
    drawing = true;
    setBoundaries();
    positionTZero();
    moveFloatObjs();
}

function redraw(){
    stopdrawing(50);
    setBoundaries();
    positionTZero();
    moveFloatObjs();
}

function setBoundaries(){
    var parent = floatElmts[0].parentElement;
    var absOffset = cumulativeOffset(parent);
    var width = parent.offsetWidth;
    var height = parent.offsetHeight;
    xMax = xMin + width - 100;
    yMin = absOffset.top;
    yMax = yMin + height - 100;
    console.log("xMin: "+xMin+", xMax: "+xMax+", yMin: "+yMin+", yMax: "+yMax);
}

function positionTZero(){
    for(var i = 0; i < floatObjs.length; i++){
        var elmt = floatObjs[i].floatElmt;
        var x = randomNum(xMin,xMax);
        var y = randomNum(yMin,yMax);
        
        elmt.style.left = x+"px";
        elmt.style.top = y+"px";
    }
}

function moveFloatObjs(){
    if(window.mobileAndTabletCheck == true){
        positionTZero();
        setTimeout('moveFloatObjs()', 5000);
        return;
    }
    for(var i = 0; i < floatObjs.length; i++){
        var elmt = floatObjs[i].floatElmt;
        var x = parseInt(elmt.style.left);
        var y = parseInt(elmt.style.top);
        var direction = getOrChangeDirection(x,y,floatObjs[i].direction);
        var myDelta = deltas[direction];

        var new_x = x + myDelta.x*moveBy;
        var new_y = y + myDelta.y*moveBy;

        floatObjs[i].direction = direction;
        elmt.style.left = new_x+"px";
        elmt.style.top = new_y+"px";
    }
    if(drawing){
        setTimeout('moveFloatObjs()',10);
    }
}

function getOrChangeDirection(x, y, direction){
    var nowDelta = deltas[direction];
    if(x+moveBy*nowDelta.x > xMin && x+moveBy*nowDelta.x < xMax
        && y+moveBy*nowDelta.y > yMin && y+moveBy*nowDelta.y < yMax){
        return direction;
    }
    var chooseFrom = new Array(0,1,2,3,4,5,6,7);
    if(x+moveBy*nowDelta.x <= xMin){
        removeElements(chooseFrom, new Array(4,5,6));
    } else if(x+moveBy*nowDelta.x >= xMax){
        removeElements(chooseFrom, new Array(0,1,2));
    } else if(y+moveBy*nowDelta.y <= yMin){
        removeElements(chooseFrom, new Array(0,6,7));
    } else if(y+moveBy*nowDelta.y >= yMax){
        removeElements(chooseFrom, new Array(2,3,4));
    }
    return chooseFrom[randomNum(0,chooseFrom.length)];
}

function removeElements(removeFrom, elements){
    var i = 0;
    while(i < removeFrom.length && elements.length > 0){
        if(removeFrom[i] == elements[0]){
            removeFrom.splice(i,1);
            elements.splice(0,1);
        } else {
            i++;
        }
    }
}

function randomNum(start,end){
    var rand = Math.random();
    return Math.floor(rand*(end-start)+start);
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

var scrollValue = 0;

$(window).scroll(function(){
    var x = $(this).scrollTop();
    if(x > scrollValue) {
        $(".my-navbar").addClass("sticky");
        $(".my-nav-list").addClass("sticky");
    } else {
        $(".my-navbar").removeClass("sticky");
        $(".my-nav-list").removeClass("sticky");
    }
    scrollValue = x;
});