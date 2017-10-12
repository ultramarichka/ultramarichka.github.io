$(document).ready(function(){

var tempInCelsiusPlusSymbol = "some temp";
var tempInFahrenheit = "another temp";

	
//Form a success function for getJSON
function successCallback(response) {
    var tempInKelvins = response.main.temp;
    var tempInCelsius = Math.floor(tempInKelvins - 273.15);
    tempInCelsiusPlusSymbol = tempInCelsius + ' &#8451';
  
    $("#temp").html(tempInCelsiusPlusSymbol);
    tempInFahrenheit = Math.floor(tempInCelsius * (9 / 5) + 32);
    tempInFahrenheit = tempInFahrenheit + ' &#8457';
    
    //shows icon
    var yourIcon = response.weather[0].icon;
    var yourImageSrc = 'https://openweathermap.org/img/w/' + yourIcon + '.png';
    $("#icon").attr("src", yourImageSrc); 

    //create obj key = yourIcon; value = BackgroundSrc
    console.log(yourIcon);
    var myObj = {"01d" : "http://i63.tinypic.com/bvqzb.jpg",
                 "01n" : "http://i64.tinypic.com/2a7uf5z.jpg",
                 "02d" : "http://i65.tinypic.com/15x8igh.jpg",
                 "02n" : "http://i68.tinypic.com/34nfa1k.jpg",
                 "03d" : "http://i66.tinypic.com/5upu13.jpg",
                 "03n" : "http://i66.tinypic.com/2njipty.jpg",
                 "04d" : "http://i68.tinypic.com/332m6j7.jpg",
                 "04n" : "http://i63.tinypic.com/oaya6r.jpg",
                 "09d" : "http://i66.tinypic.com/23jrj9x.jpg",
                 "09n" : "http://i64.tinypic.com/2hrj3a0.jpg",
                 "10d" : "http://i66.tinypic.com/2u6l9x1.jpg",
                 "10n" : "http://i68.tinypic.com/211km6f.jpg",
                 "11d" : "http://i66.tinypic.com/2910poi.jpg",
                 "11n" : "http://i66.tinypic.com/hrd9x4.jpg",
                 "13d" : "http://i68.tinypic.com/2jdjhmx.jpg",
                 "13n" : "http://i66.tinypic.com/wia3nn.jpg",
                 "50d" : "http://i68.tinypic.com/x6mv02.jpg",
                 "50n" : "http://i64.tinypic.com/2uhmvki.jpg"};
   for (var key in myObj){
     var yourBackgroundImageSrc = "url("+ myObj[yourIcon] +")";
    $("#background").css("background-image", yourBackgroundImageSrc); 
   }
    

} 

//
function buttonCallback(){
    //FORM a url for getJSON
    var url = 'https://api.openweathermap.org/data/2.5/weather';

      //gets value from text input 
      var yourCity = $("#cities").val();
      var newUrl = url + "?q=" + yourCity + "&APPID=dc173d8be8892a017dc4a0db78ca1318";
      url = newUrl;


    //call getJSON
    $.getJSON(url, successCallback);
}


function successGeolocationFinder(response){
  $("#cities").val(response.city); 
  buttonCallback();
}
//GETS YOUR GEOLOCATION WITH HELP OF freegeoip.net (THAT GETS YOUR IP) 
$.getJSON('https://freegeoip.net/json/', successGeolocationFinder);
    
  
function pressingEnterFunc(event){
  if(event.keyCode == 13){ 
  	buttonCallback(); 
  }
}


  //convert temperature function from Celsius to Fahrenheit
  function convertTempToFahrFunc(){
    $("#temp").html(tempInFahrenheit);
    $("#convertTemp").html("Convert to Celsius");
  }
  //convert temperature function - shows temp in Celsius from source(JSON)
  function convertTempToCelsius(){
    $("#temp").html(tempInCelsiusPlusSymbol);
    $("#convertTemp").html("Convert to Fahrenheit");
  } 
  
  function convertTempButtonCallback(){
 
  //shows current #temp string
  var getTempSymbolString = $("#temp").text();
  // if current #symbol is Fahrenheit
    if ( getTempSymbolString.match(/℉/g) ) {
      convertTempToCelsius();
    }
    else{  
      convertTempToFahrFunc();
    }           
  }



// =========== ASSIGN HANDLERS ("CALLBACKS") TO EVENTS =======================

//gets weather for your city when you press Enter
$("#cities").keypress(pressingEnterFunc);
//gets weather for your city when you press the button "Get weather"	
$("#get_weather").click(buttonCallback);
// converto between F and C
$("#convertTemp").click(convertTempButtonCallback);
});

