
/**
Parser 
Key: Method Insights
Token:
5ce9f79d6ecce98c8c151974f71723a4050d7d15
Reader API 
Key: akamuli
Secret: T5unVvT5rBHWVzcP5GnzJcMq53jLEM6Z
**/
var articleURL;

$(function() {
   getAmount();
//    readHeadline($("#sourceurl").val());
//    $("#parse").click(function() {
//     readHeadline($("#sourceurl").val());
// });

});


function readHeadline(_url) {
    $.ajax({
        url: "https://www.readability.com/api/content/v1/parser?url="+_url+"&token=5ce9f79d6ecce98c8c151974f71723a4050d7d15",
        dataType: 'jsonp',
        success: function(results) {
            populateHeadlines(results);
        }
    });
}




function populateHeadlines(json){
    console.log(json);
    $(".toClone .headline").clone().prependTo(".headlines");
    var headline = ".headlines .headline:first-child";
    $(".title",headline).append(json.title);
    $(".url",headline).text(json.url);
    $(".date",headline).append(json.date_published.substring(0, json.date_published.length-9));
    $(".domain",headline).append(json.domain.substring(4, json.domain.length));
    $(".wordcount",headline).prepend(json.word_count+" words");
    $(".photo img",headline).attr("src",json.lead_image_url);
    $(".excerpt",headline).append(json.excerpt);
    $(".headline").click(function() {
        readArticle($(".url",this).text());
    });
}


function readArticle(_url) {
    $.ajax({
        url: "https://www.readability.com/api/content/v1/parser?url="+_url+"&token=5ce9f79d6ecce98c8c151974f71723a4050d7d15",
        dataType: 'jsonp',
        success: function(results) {
            populateArticle(results);
        }
    });
}

function populateArticle(json){
    console.log(json);
    $("h1").text(json.title);
    $(".content").html(json.content);
    $(".article a").attr("href",json.url);
}






var amount;
var apiurl = "http://api.tumblr.com/v2/blog/akamuli.tumblr.com/posts/link?api_key=ie3ZbRrUJ3hvRYbxadWcjF7zC6sI8lNn2EnAAl4rlh1h43wpBf";
//var apiurl = "http://api.tumblr.com/v2/blog/whitemenwearinggoogleglass.tumblr.com/posts/text?api_key=ie3ZbRrUJ3hvRYbxadWcjF7zC6sI8lNn2EnAAl4rlh1h43wpBf&notes_info=true";

// $(function() {

//   //  insta();
// });


function getAmount() {
    $.ajax({
        url: apiurl,
        dataType: 'jsonp',
        success: function(results) {
            amount = results.response.posts.length;
            jQuery.each(results.response.posts, function(i, val) {
              readHeadline(results.response.posts[i].url);
             console.log(results.response.posts[i].url);        
         });
        }
    });
}



function insta() {
    $.ajax({
        url: apiurl,
        dataType: 'jsonp',
        success: function(results) {
            console.log(results);
           // amount = results.response.posts.length;
            //loadQuote();
        }
    });
}

function loadQuote() {
    var quoteID = Math.floor(Math.random() * amount);
    $.ajax({
        url: apiurl + "&offset=" + quoteID + "&limit=1",
        dataType: 'jsonp',
        success: function(results) {
            document.getElementById("quote").innerHTML = results.response.posts[0].text;
            document.getElementById("author").innerHTML = results.response.posts[0].source;
            console.log(results.response);
            setTimeout("loadQuote()", 5000);
        }
    });
}





