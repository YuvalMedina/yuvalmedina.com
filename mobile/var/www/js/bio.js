var bioUrl = "https://gist.githubusercontent.com/YuvalMedina/e8648ec80fdfe390659b855fdd258512/raw/yuvalmedinaBio.txt"
var request = new XMLHttpRequest();

// fills bio from text submitted on my git gist. link provided above

request.open("GET", bioUrl);
request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        var response = request.responseText;
        console.log('-->' + 'bio' + 'data:' + response);
        fillBio(response);
    }
}
request.send();

function fillBio(bioData){
    var bioRow = document.createElement("div");
    bioRow.className = "row cover";

    var bioContainer = document.createElement("div");
    bioContainer.className = "col-lg-11 biocolumn";

    var bioSpan = document.createElement("span");
    bioSpan.className = "biocontainer";
    
    bioText = document.createElement("p");
    bioText.className = "bio";
    bioText.innerHTML = bioData;

    bioSpan.appendChild(bioText);
    bioContainer.appendChild(bioSpan);
    bioRow.appendChild(bioContainer);

    document.body.appendChild(bioRow);

    appear(bioContainer, 0, 5, 100);
    appear(document.getElementsByClassName("header")[0], 0, 5, 100);
}