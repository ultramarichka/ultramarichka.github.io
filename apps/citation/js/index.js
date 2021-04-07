var myQuotes = [
  //{  "quoteText": "<img src='http://i66.tinypic.com/i4hhtj.jpg' class='img-responsive'>",
  //   "author":""},
  {  
    "quoteText":"Cybersyn was a Chilean project (1971–1973 during the presidency of Salvador Allende) aimed to involve warkers to manage enterprises.", 
    "author":"- Wikipedia"},
  {
    "textLink":"http://www.brainyquote.com/quotes/quotes/v/vladimirle161351.html",
    "quoteText":"Fascism is capitalism in decay.", 
    "author":"― Vladimir Lenin"},
  {"id":1,
    "textLink":"http://www.brainyquote.com/quotes/quotes/v/vladimirle380778.html",
   "quoteText":"Sometimes - history needs a push.", 
    "author":"― Vladimir Lenin"},
  {"id":2,
    "textLink":"http://www.brainyquote.com/quotes/quotes/v/vladimirle180597.html",
    "quoteText":"Our program necessarily includes the propaganda of atheism.", 
    "author":"― Vladimir Lenin"
  }, {
  "quoteText":"We know the past but cannot control it. We control the future but cannot know it.",
  "author":"— Claude Shannon" 
  }, {
  "quoteText":"Самое дорогое у человека - это жизнь. Она дается ему один раз, и прожить её надо так, чтобы не было мучительно больно за бесцельно прожитые годы, чтобы не жег позор за подленькое и мелочное прошлое и чтобы умирая, смог сказать: вся жизнь и все силы были отданы самому прекрасному в мире - борьбе за освобождение человечества. И надо спешить жить. Ведь нелепая болезнь или какая-нибудь трагическая случайность могут прервать её.",
  "author":'— Островский, "Как закалялась сталь"' 
  }, {
  "quoteText":"В сумасшедшем доме каждый мог говорить всё, что взбредет ему в голову, словно в парламенте.",
  "author":"— Гашек"
  }, {
  "quoteText":"мы можем управлять только тогда, когда правильно выражаем то, что народ осознает.",
  "author":"— Ленин"
  }, {
  "quoteText":"Наука движется толчками в зависимости от успехов, делаемых методикой",
  "author":"— Павлов"
   }, {
  "quoteText":"I take photos only of those whom I love.",
  "author":"— Nan Goldin"
   }, {
  "quoteText":"The camera is as much a part of my everyday life as talking or eating or sex.",
  "author":"— Nan Goldin"
   }, {
  "quoteText":"I knew from a very early age, that what I saw on TV had nothing to do with real life. So I wanted to make a record of real life",
  "author":"— Nan Goldin"
    }, {
  "quoteText":"I don't even like photography at all. I'm just doing photography until I can do something better.",
  "author":"— Nan Goldin"  
  }, {
  "quoteText":"Live as if you were to die tomorrow. Learn as if you were to live forever.",
  "author":"― Mahatma Gandhi"  
  }, {
  "quoteText":"To live is the rarest thing in the world. Most people exist, that is all.",
  "author":"― Oscar Wilde" 
   }, {
  "quoteText":"If you tell the truth, you don't have to remember anything.",
  "author":"― Mark Twain" 
   }, {
  "quoteText":"A friend is someone who knows all about you and still loves you.",
  "author":"― Elbert Hubbard" 
    }, {
  "quoteText":"Be the change that you wish to see in the world.",
  "author":"― Mahatma Gandhi" 
    }, {
  "quoteText":"You only live once, but if you do it right, once is enough.",
  "author":"― Mae West"
    }, {
  "quoteText":"A room without books is like a body without a soul.",
  "author":"― Marcus Tullius Cicero"
    }, {
  "quoteText":"The history of all hitherto existing society is the history of class struggles.",
  "author":"― Karl Marx"
    }, {
  "quoteText":"The philosophers have only interpreted the world, in various ways. The point, however, is to change it.",
  "author":"― Karl Marx"
    }, {
  "quoteText":"To be radical is to grasp things by the root.",
  "author":"― Karl Marx"
    }, {
  "quoteText":"Лекция - это беседа умных людей заинтерисованных в получении истины",
  "author":"― Валерий Босенко"  
  }, {
  "quoteText":"Лишь доведение преподаваемого до чувства может превратить знания в убеждения",
  "author":"― Валерий Босенко"
  }, {
  "quoteText":"Если студент выступает субъектом воспитания, то почему бы ему не предложить соавторство в подготовке к лекции",
  "author":"― Валерий Босенко"
  }, {
  "quoteText":"Настоящие революционеры - умеющие превратить любую работу в интересную",
  "author":"― Валерий Босенко"
  }, {  
  "quoteText":"Should graffiti be judged on the same level as modern art? Of course not: It's way more important than that.",
   "author":"― Banksy"  
  }, {
  "quoteText":"If you plan for one year, plant rice. If you plan for ten years, plant trees. If you plan for 100 years, educate humanity.",
  "author":"― Chinese Proverb"
  }, {
  "quoteText":"People who are crazy enough to think they can change the world, are the ones who do.",
  "author":"― Rob Siltanen"  
  }];


$(document).ready(function() {
  /*
  $(function() {                            //function to centrelise my div
    $('#center').css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : -$('#quotes').outerWidth()/2,
        'margin-top' : -$('#quotes').outerHeight()/2
    });
  });*/
  
  //shows first quote
    quoteButtonOnClickCallback(0);
    // displays randomly myQuotes[i] when button is on
  $("#quote_button").on("click", quoteButtonOnClickCallback);
});


 function quoteButtonOnClickCallback(random){
  //if (random == 0){
    //var selectedImage = "<img src='" + myQuotes.quoteImageSrc + "' class='img-responsive'>";
    //$("#forImage").html(selectedImage);}
 if (random !== 0) //undefined || random < 0 || random >= myQuotes.length ) //esli ARGUMENT random ne raven nulu
  {
    //[random] = random integer min=0, max = length-1
    var random = Math.floor(Math.random()*(myQuotes.length));
  }
  //display random myQuote[random].quoteText
  ////select object in myQuotes
  var selectedObject = myQuotes[random];
  ////select quoteText 
  var selectedQuote = selectedObject.quoteText;
  ////select author
  var selectedAuthor = selectedObject.author;
  ////selectedQuote and selectedAuthor -> to html DOM object
  $("#citation").html(selectedQuote);
  //selectedAuthor -> to html
  $('#author_first').html(selectedAuthor);
  
  
  //text of new quote that appears after pressing "more quotes" button
  var newText = selectedQuote + selectedAuthor;
    var newLink = {
      "tweetShareLink":"https://twitter.com/intent/tweet?",
      "url":"https://codepen.io/ultramarichka/pen/MyqarK",
      "text":"newText"
    }
    var newUrl = newLink.tweetShareLink + "url=" + newLink.url + "&text=" + newText;
    //when "more quotes" button is pressed - the link for tweet button changes accordinaly to text of new quote 
    $("#tweet_button").attr("href", newUrl);
  
  //removes author of first quote(in html)
   // $("#author_first").remove();
  
}


//facebook share button

/*
(function(d, s, id) {
  var js, fjs = d.getElementsByTagName(s)[0];
  if (d.getElementById(id)) return;
  js = d.createElement(s); js.id = id;
  js.src = "//connect.facebook.net/en_US/sdk.js#xfbml=1&version=v2.6";
  fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
*/

//share button
/*
Share = {
	vkontakte: function(purl, ptitle, pimg, text) {
   	url  = 'https://vk.com/share.php?';
		url += 'url='          + https://codepen.io/ultramarichka/pen/MyqarK;
		url += '&title='       + Quotes;
    //url += '&image='       + encodeURIComponent(pimg);
		url += '&description=' + encodeURIComponent(text);
		url += '&noparse=true';
		Share.popup(url);
	},
  popup: function(url) {
		window.open(url,'','toolbar=0,status=0,width=626,height=436');
	}
};
*/
