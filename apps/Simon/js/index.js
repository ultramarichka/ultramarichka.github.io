$(document).ready(function(){
  var flag = true;   //to know if it's user's turn
  var count = 0; 
  var classesArray = ["red", "yellow", "green", "blue"];
  var newArray = [];
  var audioMistake = document.createElement('audio');
    audioMistake.setAttribute('src', 'https://ultramarichka.github.io/Simon/mistake.mp3');

  var audioObject = {"audioRed":"1",
                     "audioYellow":"2",
                     "audioGreen":"3",
                     "audioBlue":"4"
                     }
  var flagCount = 0;  //counts user's pressings of buttons corresponding newArray's ids 
  var restartFlag = true; 

  
  function addRandomToArr(){
    //create random variable [0, 4)	<- element of classesArray	  
    var randomNumber = Math.floor(Math.random()*4);
    //remember the order
    newArray.push(classesArray[randomNumber]);
    return newArray;     
  }

  function pressingButtons(){
    //in the order specified by newArray press corresponding button - interface it - css :
    //for all elements of newArray
      // disable user input
      $(".forButtons, .forArrows").off("click");
      $(".forButtons, .forArrows").removeClass("elementsActive");
      $(document).off("keydown");
    for (let i = 0; i<newArray.length; i++){        //let instead of var, since let creates a new scope for i in each iteration
      var pressed;
      var delta = 900 + Math.floor(500/newArray.length);
      setTimeout(function() {
        pressed = $('.'+newArray[i]);
				pressed.addClass("simonSays");
        music(newArray[i]); 
      }, 1000 + i*delta);
      
      var epsilon = delta - 400;
      setTimeout(function() {
				pressed.removeClass("simonSays");
        if(i == newArray.length - 1){
					//enable user input
          $(".forButtons, .forArrows").click(usersTurn);
          $(".forButtons, .forArrows").addClass("elementsActive"); 
			    $(document).keydown(bindKeys);
 
        }
			}, 1000 + i*delta + epsilon);
    }
  }

  function compareFunc(event) {
    //start counting - wait N seconds for user to press button???......
	  //--------------
	  //-------------- 
    //if user makes a mistake or time is out 
	  if(!$(event.target).hasClass(newArray[flagCount])){   //.....call new event for every i.....??this is simetrical, right?
	    //make sound corresponding to the mistake
      audioMistake.volume = 0.2;
	    audioMistake.play();
      flagCount = 0;
	  	//in a strict mode :
		  //if he doesn't -> reload the page
	    if ($("#strict").is(":checked")){
		    newArray = [];
		    count = 0;
				location.reload(true);
	    } else {
	      console.log("mistake non-strict");
	      //in non-strict mode : repeat the pressing buttons with the given order
	      pressingButtons();
	    }
	  } else {
			music(newArray[flagCount]);
      flagCount = flagCount + 1;
      
    }
    return flagCount;
  } 

  function usersTurn(event){
    if(!flag){      
      compareFunc(event);
    }
    //if user have pressed everething correct -> interface the current count
		if (flagCount == count + 1){ 
      count = count + 1;   
      flag = true;
      simonCycle();
    }
  }

  function simonCycle(){
  //!!'mainloop' DOESNT WORK for js
    flagCount = 0;
		if (flag){
      $('#count').val(count);  
		  if (count == 20){
		    alert("YOU WIN");
		    //reload the window
		    location.reload(true);
		  }
		  addRandomToArr();
			
      console.log("I/m SIMON: nA, c, fC", newArray, count, flagCount);
		  pressingButtons();
		  flag = false;
        		
    }
  }
  
  function start(){
    if (!restartFlag){
      flag = true;
      count = 0;
      newArray = [];
      $('#count').val();
    } else { 
      restartFlag = false;
    }
    $("#start").html("RESTART");
    $("#start").addClass("restart");
    simonCycle();                 
  }

  function music(str) {
    for (prop in audioObject){
      if (str.slice(length - 1) == prop.slice(length - 1) ){
        
        var link = 'https://s3.amazonaws.com/freecodecamp/simonSound';
        link = link.concat(audioObject[prop]);
        link = link.concat('.mp3');

        prop = document.createElement('audio');  //i'm changing type of prop here, corresponding -> audioObject[prop]. 
        prop.setAttribute('src', link);          //Thus I had to make link before
        prop.play();
      }
    }
  }
  
  $("#start").click(start);

  function bindKeys(e) {
			//Process keypresses https://stackoverflow.com/a/6011119/8325614
				switch(e.which) {
						case 37: // left
						var g = $("path.green").trigger("click");
						g.addClass("simonSays");
						setTimeout(function() {
							g.removeClass("simonSays");
						}, 200);
						break;

						case 38: // up
						var g = $("path.red").trigger("click");
						g.addClass("simonSays");
						setTimeout(function() {
							g.removeClass("simonSays");
						}, 200);
						break;

						case 39: // right
						var g = $("path.yellow").trigger("click");
						g.addClass("simonSays");
						setTimeout(function() {
							g.removeClass("simonSays");
						}, 200);
						break;

						case 40: // down
						var g = $("path.blue").trigger("click");
						g.addClass("simonSays");
						setTimeout(function() {
							g.removeClass("simonSays");
						}, 200);
						break;

						default: return; // exit this handler for other keys
				}
				e.preventDefault(); // prevent the default action (scroll / move caret)
			}

});

//setTimeout syncronous/asyncronous functions https://www.pluralsight.com/guides/front-end-javascript/introduction-to-asynchronous-javascript