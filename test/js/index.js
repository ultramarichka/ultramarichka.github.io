document.body.onload = demo();

function demo(){
  new Slider(document.body, 100, 0, 750, 1, '#fbe5f7');
}

function Slider(container, R, min_value, max_value, step, color){
  var self = this;
  this.r = R*0.8;
  self.fi0 = -Math.PI/2;
  self.fi = 0 ; 
  
  this.dh = (R - this.r) + 8; 
  this.container = container;
  self.beingDragged = false;

  var r = this.r;
  var dh = this.dh;
  var fi = self.fi;
  var fi0 = self.fi0; 

  this.div_slider = document.createElement("div");
  this.div_slider.id = "slider";
  this.container.appendChild(this.div_slider);

  this.div_oCircle = document.createElement("div");
  this.div_oCircle.id = "outer_circle";
  this.div_oCircle.style.width=2*R+"px";
  this.div_oCircle.style.height=2*R+"px";
  this.div_oCircle.style.borderRadius = R+"px";
  this.div_oCircle.style.background = "#d3d3d3";
  this.div_oCircle.style.opacity = "0.6";
  this.div_slider.appendChild(this.div_oCircle);

  //right half-circle hover
  this.div_oCircleHover = document.createElement("div");
  this.div_oCircleHover.style.width=R+"px";
  this.div_oCircleHover.style.height=2*R+"px";
  this.div_oCircleHover.style.borderRadius = R+"px 0 0 "+R+"px";
  this.div_oCircleHover.style.background = "linear-gradient(0deg, rgb(0,255,0,1), rgb(0,255,0,0) 100px)";
  this.div_oCircleHover.style.zIndex = "1";
  this.div_oCircle.appendChild(this.div_oCircleHover);
  

  this.div_iCircle = document.createElement("div");
  this.div_iCircle.id = "inner_circle";
  this.div_iCircle.style.width= 2*r+"px";
  this.div_iCircle.style.height= 2*r+"px";
  this.div_iCircle.style.borderRadius = r+"px";
  this.div_iCircle.style.background = "white";
  //this.div_iCircle.style.opacity = "0.6";
  this.div_iCircle.style.position = "relative";
  this.div_iCircle.style.left = (R-r)+"px";
  this.div_iCircle.style.top= (R-r)+"px";
  this.div_iCircle.style.zIndex = "2"; 
  this.div_oCircleHover.appendChild(this.div_iCircle);
  // distance to top left corner of div_iCircle from widow origin of coordinates
  // nice approach from here https://stackoverflow.com/a/33347664/8325614
  var x0 = self.div_iCircle.getBoundingClientRect().left;
  var y0 = self.div_iCircle.getBoundingClientRect().top;
 

  this.div_handle = document.createElement("div");
  this.div_handle.id = "handle";
  this.div_handle.style.width= dh+"px";
  this.div_handle.style.height= dh +"px";
  this.div_handle.style.borderRadius = dh/2+"px";
  this.div_handle.style.background = "red";
  this.div_handle.style.border = "1px solid #a8a8a8";
  this.div_handle.style.position = "relative";
  this.div_handle.style.zIndex = "3"; 
  this.div_iCircle.appendChild(this.div_handle);

  
  
  self.update = function(fi){
    //self.fi = fi;
    self.div_handle.style.left= r + (r+(R-r)/2)*Math.cos(fi + fi0) - dh/2 +"px";  //x = r*cos(fi); x-coordinate of the #handle
    self.div_handle.style.top= r + (r+(R-r)/2)*Math.sin(fi +fi0) - dh/2 +"px";   //y - coordinate of the #handle
  }
  self.update(5*Math.PI/4);

  // -----------CALLBACKS--------------------
  function click(e){
    if (!e){e = window.event;} 
    //mask the inner circle https://stackoverflow.com/a/1369080/8325614
    if (( e.target !== self.div_oCircle) && (e.target !== self.div_oCircleHover)) {return;}
    // find mouse coordinates
    var x = e.pageX;
    var y = e.pageY;
    //move handle to the coordinates
    fi = Math.atan2(x - x0 - self.r , (y - y0 - self.r));
    self.update(-(fi + Math.PI));
    self.div_oCircleHover.style.background = "linear-gradient(0deg, rgb(0,255,0,1), rgb(0,255,0,0) "+ ((y0 + 2*self.r +(R-r)/2) -y) +"px)";
  }

  function drag(e){
    if (!e){e = window.event;} 
    if(!self.beingDragged){return;}
    // find mouse coordinates
    var x = e.pageX;
    var y = e.pageY;
   
    //move handle to the coordinates
    fi = Math.atan2(x - x0 - self.r , (y - y0 - self.r));
    self.update(-(fi + Math.PI));  //why -Math.PI????
    if((-(fi + Math.PI) > Math.PI) && (-(fi + Math.PI) < 2*Math.PI)){
      self.div_oCircleHover.style.background = "linear-gradient(0deg, rgb(0,255,0,1), rgb(0,255,0,0) "+ ((y0 + 2*self.r +(R-r)/2) -y) +"px)";
    }
    
  
  } 

  function enableDrag(e){
    self.beingDragged = true;
    window.onmousemove = drag;  //????
    drag(e);
  } 

  function disableDrag (){
    self.beingDragged = false;
    window.onmousemove = undefined;
  }
  /*
  //------TOUCH CALLBACKS-------
  function touchStart(e){
    e.preventDefault();
    //if (!e){e = window.event;} 
    //mask the inner circle https://stackoverflow.com/a/1369080/8325614
    if( e.target !== self.div_oCircle && e.target !== self.div_handle) return;
    if(e.target == self.div_oCircle){
      // find 'mouse' coordinates
      var x = e.pageX;
      var y = e.pageY;
      //move handle to the coordinates
      fi = Math.atan2(x - x0 - self.r , (y - y0 - self.r));
      self.update(-fi+Math.PI/2);
      //-----if touchend happen -> that's it
    }
    
    if (e.target == self.div_handle){
    //else enableTouchDrag OR addEventListener ("touchmove", ...)
      this.div_handle.touchmove = enableTouchDrag; 
      this.div_handle.touchend = disableTouchDrag; 
    }
  }

  function enableTouchDrag(e){
    e.preventDefault();
    self.beingDragged = true;
    console.log(event.target);
    e.target.touchmove = drag;
    drag(e);
  }
  function disableTouchDrag(e){
    e.preventDefault();
    self.beingDragged = false;
    alert(event.target);
    e.target.touchmove = undefined;
  }
 */

  // -----------ATTACH CALLBACKS------------
  
  this.div_oCircle.onclick = click;
  this.div_oCircleHover.onclick = click;
  this.div_handle.onmousedown = enableDrag;

  window.onmouseup = disableDrag; 

  //this.div_oCircle.touchstart = touchStart; 
  
  /*touch events always target the element where that touch STARTED, while mouse events target 
   the element currently under the mouse cursor.

   -> wait until you get a touchstart event and then add touchmove/touchend/touchcancel handlers
   to the target of the touchstart event (and remove them on end/cancel)
   https://www.html5rocks.com/en/mobile/touchandmouse/
  */

}



  

