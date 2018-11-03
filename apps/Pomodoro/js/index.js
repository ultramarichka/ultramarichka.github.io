$(document).ready(function(){
  
  $(function() {                            //function to centrelise my div
    $('#center').css({
        'position' : 'absolute',
        'left' : '50%',
        'top' : '50%',
        'margin-left' : -$('#slider').outerWidth()/2,
        'margin-top' : -$('#slider').outerHeight()/2
    });
  });
 
   function resetFunc (){
     audioElement.pause();
     $("#slider").roundSlider({
      value: 25
    });
  }

    if (jQuery(window).width() >= 620) {
      console.log("privet kuku");
      $("#slider").roundSlider({
        radius: "200%",
        tooltipFormat: function (args) {
          return  args.value + " min";
        }
      });
 
    } else {
      $("#slider").roundSlider({
        radius: "130%",
         tooltipFormat: function (args) {
          return args.value + " min";
        }
      });
      //$("#slider").css("font-size", "5px"); 
    }
    
  
  $("#slider").roundSlider({
      sliderType: "min-range",
      handleSize: "+16",
      handleShape: "dot",
      width: 5,
      
      value: 25,
      startAngle: 90,
      max: 60,
      min: 0,
      editableTooltip: false,
      
      mouseScrollAction: true,
      change: function (e) {
        if (e.value != 0) {
          audioElement.pause();
        }
      }    
  });
  

  var audioElement = document.createElement('audio');
  audioElement.setAttribute('src', 'res/ghyaghya_vanya.mp3');
  
  
  function callback(){
    var num = $("#slider").roundSlider("option", "value");     //get value
      num = num - 1;                                           //set value
      $("#slider").roundSlider("option", "value", num);
   if (num == 0) {
      audioElement.play();
    } 
  }
  
  
  function myFunc(){
    var intervId = setInterval(callback, 1000*60);
  }
  myFunc();
  
  
  $("#reset").click(resetFunc);
});
