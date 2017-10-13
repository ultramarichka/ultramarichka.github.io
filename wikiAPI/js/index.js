$(document).ready(function(){


function successCallback(response){

  var resultDivElement = document.getElementById("result");
  //clear all inner of resultDivElement
  resultDivElement.innerHTML = "";  

  for(var i = 0; i<10; i++) {
   var eachArticleUrl = "https://en.wikipedia.org/wiki/" + response.query.search[i].title ;
   var oneArticle = "<a href=' " + eachArticleUrl + "' target='_blank'><div><h2>" + response.query.search[i].title + "</h2>" + "<div class='snippet'>" + response.query.search[i].snippet + "...</div></div></a></br>"; 
   //i = i + 1;
   //setter ( getter + ...) 
    $('#result').html( $('#result').html() + oneArticle);
  }
}

function errorFunc(){
 console.log("error");
}

function getsWikiArticle(){
  //gets value from text input  
  var yourQuery = $("#queryWiki").val();
  // use generator to get data about a set of pages that would be the result of two different API calls --> http://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch= --> here i'm searshing for title and snippet 
  //                                                                                                     + I need another API call to get url of set of pages ofr making links   
  var url = "https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=" + yourQuery;
  //CORS (Cross-Origin Request Smth) --> solved with JSONP <-- "&callback=?" in url
  var response = $.getJSON(url + "&callback=?", successCallback);
  response.fail(errorFunc); 
  
}

function pressingEnterFunc(event){
  if(event.keyCode == 13){ 
  getsWikiArticle();    
  }
}



//gets yourQuery when you press Enter
$("#queryWiki").keypress(pressingEnterFunc); 
$("#searchButton").click(getsWikiArticle); 
 
});