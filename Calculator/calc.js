$(document).ready(function(){   
  var a = 0;                   //first number
  var action = "+";   //to know if I press action after first number or the second number has already been set
  var numberFlag = "";  // if empty previous click was action
  var actionFlag = "";
  
  var actionObj = {"+" : "plus",
                   "-": "minus",
                   "*" : "multiple",
                   "/" : "divide"};
  

  function createHtmlTable(){
    $("body").append('<div id = "center"></div>');
    $("#center").append('<div id = "frame"></div>');
    $("#frame").append('<input id="input" readonly></br>');
    $("#frame").append('<table id="taburu"></table>');

    var arr = [ ['AC','C','<i class="fa fa-music" aria-hidden="true"></i>','&#x232b'],
                ['1','2','3','&divide'], 
                ['4','5','6','*'],
                ['7','8','9','-'],
                ['0','.','=','+']
              ];
    var idd = [ ['ac','c','play','x'],
                ['1','2','3','divide'], 
                ['4','5','6','multiple'],
                ['7','8','9','minus'],
                ['0','dot','equals','plus']
              ];          
    
    
  $(function() {                            //function to centrelise my div
    $('#center').css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : -$('#frame').outerWidth()/2,
        'margin-top' : -$('#frame').outerHeight()/2
    });
  });
 
    for (var i = 0; i < arr.length; i++){
        
      $("#taburu").append('<tr></tr>');
      // $("#taburu").append('<tr id='+'tr_'+i+'></tr>');
      for (var j = 0; j <= 3; j++){
	var appendstring='<td id="'+idd[i][j]+'"><button>'+arr[i][j]+'</buton></td>';
        $('#taburu').append(appendstring);    
      }
    }
  }
  createHtmlTable();
  $("#input").val(0);
  var b = 0;                 //second number

  
  function makeCallback(id_number){
    //return a closure
    return function(){
      if( numberFlag != ""){   //if number is pressed before action  
        $("#input").val($("#input").val() + id_number);	 //'add' number to input       
      } else {  //if number is pressed after action  
        $("#input").val("");                     //clean input  
        $("#input").val(id_number);              //set to input a new value 
        numberFlag = "first number is being born here";  
      }
    }  
  }

  //functions factory
  function makeActionCallback(key){
    //return a closure
    return function(){
      if(actionFlag != ""){
        b = Number($("#input").val());
        if (action == "/" && b == 0 || typeof a != 'number' || isNaN(a)){  //if !PREVIOUS! action "/" ...
          $("#input").val("error"); 
          a = $("#input").val();
        } else {
          $("#input").val(eval(a + action +b));   //show result in input of previous action on two numbers and set result to first number
          a = Number($("#input").val());
          action = key;                               //remember currently pressed action
        }
      } else {
        action = key; 
        a = Number($("#input").val());
        actionFlag = "here is first action";   //remember the action but do not do any evaluation
      }
      numberFlag = "";
    }
  } 

  function equalCallback(){
    if (actionFlag != ""){
      b = Number($("#input").val());
      if (action == "/" && b == 0 || typeof a != 'number' || isNaN(a)){  
        $("#input").val("error");
        a = $("#input").val(); 
      } else {
        $("#input").val(eval(a + action +b));
        a = Number($("#input").val()); 
      }
    } else {
    $("#input").val(eval(a + action + b)); 
    a = Number($("#input").val());
    }
    numberFlag = "";
    actionFlag = "";
  } 
  
  function eventToStr(event1){
    var str = "#";
    //gets id of the clicked button
    var id =  event1.target.id; 
    str = str.concat(id.toString());
    return str;
  }

  function dot(event){
    //$("#input").val($("#input").val() + $(eventToStr(event)).html());
    $("#input").val(($("#input").val()).concat("."));
  }
 
  function cleanAll(){
    a = 0;
    action = "+";
    numberFlag = "";
    actionFlag = "";
    $("#input").val(0);
    b = 0; 
    flagPlay = true;
  }
  
  function cleanInput(){
    return  $("#input").val("");
  }

  function delLastNumber(){
    var str = $("#input").val();
    return  $("#input").val(str.slice(0, str.length-1));
  }  
  
 
  var audioElement = document.createElement('audio');
    audioElement.setAttribute('src',
'https://ultramarichka.github.io/Kraftwerk-Pocket_calculator.mp3');

   
  var flagPlay = true;
  function music() {
    if(flagPlay){
      console.log("hello");
      audioElement.play();
      flagPlay = false;
    } else {
      audioElement.pause();
      flagPlay = true; 
    }
  }
  
  /*
  function pressingEnterFunc(event){
    var charCodes = {'0' : '48'};
    for (var key in charCodes){
      if(event.keyCode == 13){ 
        $("#"+ actionObj[key]).click(makeActionCallback(key));
      }   
    }
  }
  
 $("#channel").keypress(pressingEnterFunc); 
  
 
  var numbersCodes = {'0' : '96',
                        '1': '97',
                        '2' : '98',
                        '3': '99',
                        '4' : '100',
                        '5': '101',
                        '6' : '102',
                        '7': '103',
                        '8' : '104',
                        '9': '105'};
  function pressingNumberFunc(event){
    console.log('kuku');
    for (var key in numbersCodes){
      if(event.keyCode == Number(numbersCodes[key])){ 
        makeCallback(Number(key));
      }
    }
  }
  for (var key in numbersCodes){
    $("#"+ key).keypress("pressingNumberFunc");
  }*/
  
  for (var id = 0; id <= 9; id++){
    var numberHandlerFunction = makeCallback(id);
    $("#"+ id.toString()).click(numberHandlerFunction);
    
  }
  for (var key in actionObj){
   var actionHandlerFunction = makeActionCallback(key);
   $("#"+ actionObj[key]).click(actionHandlerFunction);
  }
  
  $("#x").click(delLastNumber);
  $("#equals").click(equalCallback);
  $("#dot").click(dot);
  $("#ac").click(cleanAll);
  $("#c").click(cleanInput);
  $('#play').click(music);
  
});
