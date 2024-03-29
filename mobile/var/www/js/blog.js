var blogUrl = "https://gist.githubusercontent.com/YuvalMedina/07e6be3d9cb35e60a708ae92d955298a/raw/yuvalmedinaBlogs.txt"
var request = new XMLHttpRequest();

// fills blogs from blogs submitted on my git gist. link provided above

request.open("GET", blogUrl);
request.onreadystatechange = function() {
    if(request.readyState === XMLHttpRequest.DONE && request.status === 200) {
        var response = request.responseText;
        console.log('-->' + 'blog' + 'data:' + response);
        var blogData = response.split('\n');
        console.log('split data: '+blogData);
        fillBlogs(blogData);
    }
}
request.send();

function fillBlogs(blogData){
    var numBlogs = parseInt(blogData[0]);
    var i = 1;
    var counter = 0;

    var blogRow = document.createElement("div");
    blogRow.className = "row allblogs";

    while(counter < numBlogs){
        var blogContainer = document.createElement("div");
        blogContainer.className = "col-lg-11 blogcontainer";

        var blogTitle = document.createElement("span");
        blogTitle.className = "blog-title";
        var blogTitleHeader = document.createElement("h3");
        blogTitleHeader.className = "mine";
        blogTitleHeader.innerHTML = blogData[i];
        i++;
        blogTitle.appendChild(blogTitleHeader);
        
        var blogTimeStamp = document.createElement("time")
        blogTimeStamp.className = "timestamp";
        blogTimeStampText = document.createElement("p");
        blogTimeStampText.className = "time";
        blogTimeStampText.innerHTML = blogData[i];
        i++;
        blogTimeStamp.appendChild(blogTimeStampText);
        blogTitle.appendChild(blogTimeStamp);

        var numlines = parseInt(blogData[i]);
        i++;
        var text = '';
        for(var j = 0; j < numlines; j++){
            text += blogData[i];
            i++;
        }
        var blogPostObj = document.createElement("span");
        blogPostObj.className = "blog-post";
        var blogTextObj = document.createElement("p");
        blogTextObj.className = "mine";
        blogTextObj.innerHTML = text;
        blogPostObj.appendChild(blogTextObj);
        
        blogContainer.appendChild(blogTitle);
        blogContainer.appendChild(blogPostObj);
        blogRow.appendChild(blogContainer);
        counter++;
    }

    document.body.appendChild(blogRow);

    appear(blogRow, 0, 5, 100);
    appear(document.getElementsByClassName("header")[0], 0, 5, 100);

    console.log('blogs filled:' + counter);
}