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
    var myObj = {"01d" : "pict/01d.jpeg",
                 "01n" : "pict/01n.jpeg",
                 "02d" : "pict/02d.jpeg",
                 "02n" : "pict/02n.jpeg",
                 "03d" : "pict/03d.jpeg",
                 "03n" : "pict/03n.jpeg",
                 "04d" : "pict/04d.jpeg",
                 "04n" : "pict/04n.jpeg",
                 "09d" : "pict/09d.jpeg",
                 "09n" : "pict/09n.jpeg",
                 "10d" : "pict/10d.jpeg",
                 "10n" : "pict/10n.jpeg",
                 "11d" : "pict/11d.jpeg",
                 "11n" : "pict/11n.jpeg",
                 "13d" : "pict/13d.jpeg",
                 "13n" : "pict/13n.jpeg",
                 "50d" : "pict/50d.jpeg",
                 "50n" : "pict/50n.jpeg",
		};
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
$.getJSON('https://api.ipstack.com/check?access_key=01f168714c408f0149af9154518276c7', successGeolocationFinder);
    
  
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
