   
   

   var childNum,   // children number for each level
      levelNum;   // maximum level number






   var initZoomLevel = 3,
      zoom = initZoomLevel,   // google map zoom value
      level = zoom - 3, // my level value
      focusNum;   // focusNum area index




   var winwidth = window.innerWidth,   // windows width
      winheight = window.innerHeight;  // windows height

   var rectWidth = winwidth/4,      // rect marker width
      rectHeight = winheight/4;  // rect marker height

   // def of marker rect and marker center points
   var rectPoint =[[ winwidth/2, winheight/3 ],
               [ winwidth*5/6, winheight*5/8 ],
               [ winwidth/2, winheight*11/12 ],
               [ winwidth/6, winheight*5/8 ],
               [ winwidth/2, winheight*5/8 ]];

   var times = true;


   var levelDepth = 0;
   var winwidth = window.innerWidth;
   var winheight = window.innerHeight;



var Node = function( level, bnds ){

   this.children = [];
   this.rect = [];
   this.bnds = bnds;

   this.level = level;
   this.zoom = this.tempZoom = 1;
   this.isfull = false;
   this.parent = null;
   this.style = 0;
   this.childStyle = 0;
   

   // marker
   this.markerArray = [];
   this.focusNum = -1;

   this.html = $("<div class='map' style='width:" + (winwidth) + "px;height:" + (winheight) + "px'></div>");
   this.deleteBtn = $("<div class='deleteBtn'></div>");
   this.fullscreen = $("<div class='fullPic'></div>");

                     
   // add div level
   $("#level"+this.level).append(this.html);

   

   this.mapOptions = {
         scrollwheel: false,
         mapTypeControl: false,
         scaleControl: false,
         center: new google.maps.LatLng( 30,120 ),
         zoom: 3,
         disableDoubleClickZoom: true,
         mapTypeId: google.maps.MapTypeId.ROADMAP,
         draggable: false,
         zoomControl: false,
         streetViewControl: false,
         panControl: false
      };

   this.map = new google.maps.Map(this.html[0], this.mapOptions);

   this.overlay = new google.maps.OverlayView();
   this.overlay.draw = function () {};
   this.overlay.onRemove = function () {};
   this.overlay.setMap(this.map);
   this.prj; 


   if(this.bnds){

      z = this.map.getZoom();
      this.map.fitBounds(this.bnds);
      if (this.map.getZoom() < z) {
         this.map.setZoom(z);
      }


   }

   var self = this;
   google.maps.event.addListener(this.map, 'idle', function() {

      self.prj = self.overlay.getProjection();

      // for level 0, no delete btn
      if(self.level != 0)
         self.html.append(self.deleteBtn);
      
      self.html.append(self.fullscreen);
      
      // first time
      if(times){
         generateMarker();
         times = false;
      }
      else{
         // if it's the right path
         if(target[self.level-1] == self.genNum){

            // if it is the target!
            if(self.level + 1 == levelNum ){


               targetMarker = new google.maps.Marker({
                  position: self.map.getCenter(),
                  map: self.map
               });
               // set target marker
               $("#targetNum").html(message);
               $(".finish").fadeIn();
            }
            else{ // else it's not yet reached the target but display the rect
               generateMarker();
            }
         }

      }


      function generateMarker(){

         // clear
         clearMarker();

         // generate
         for(var i = 0; i<childNum; i++){
            self.markerArray.push( new Marker(i, self) );
         }
      }
         
      // clear markerArray
      function clearMarker(){

         // clear rect
         for (var i = 0; i < self.markerArray.length; i++ ) {
            self.markerArray[i].clear();
         }
         self.markerArray = [];

      }

   });

   google.maps.event.addListener(this.map, 'dblclick', function() {

      self.html.find(".fullPic").click();

   });

      

}
Node.prototype.init = function(item){

   item.map.setOptions({styles: mapStyles[item.style]});


   // calculate how many levels there
   levelDepth = 0;
   for(var i = 0; i<levelNum; i++)
      if($("#page-2 ul li:nth-child("+(i+1)+") .map").length)
         levelDepth++;

   // decrease 20% for one more level
   var rootZoom = Math.pow(0.8, levelDepth-1);
   var childZoom = (1 - rootZoom) / (levelDepth - 1);
   
   root.traverse( function(node){

      // if it's full screen
      if(node.isfull){
         node.tempZoom = childZoom;
         node.html.css("zoom", node.zoom);
      }
      else{
         node.tempZoom = node.zoom = childZoom;
         node.html.css("zoom", childZoom);
      }

      node.updateMarker();

   })

   root.zoom = rootZoom;
   root.html.css("zoom", rootZoom);
   root.updateMarker();


   var startX = 0,
       startY = 0,
       left , top, 
       width = 0, 
       height = 0;


   var rect = document.createElement("div");
   rect.style.position = "absolute";
   rect.style.width = width;
   rect.style.height = height;
   rect.id = "rect";


   // if it's not the last level
   // add event listener
   if((item.level +1) != levelNum){
      item.html[0].addEventListener("mousedown", mouseDown);
   }

   // mouse down
   // add mousemove and mouseup listener
   function mouseDown(e){
      if(e.shiftKey){

         item.childStyle = item.style + item.children.length;
         rect.style.border = "6px solid " + borderColor[item.childStyle];

         e.preventDefault();
         item.html[0].addEventListener("mousemove", mouseMove);
         item.html[0].addEventListener("mouseup", mouseUp);

         startX = (e.pageX-parseInt(item.html.position().left)*item.zoom)/item.zoom;
         startY = (e.pageY-parseInt(item.html.position().top)*item.zoom)/item.zoom;
         left = startX;
         top = startY;

         rect.style.left = startX+"px";
         rect.style.top = startY+"px";
         item.html.append(rect);

         if( startX > 3*winwidth/8 && startX < 5*winwidth/8 
               && startY > winheight/12 && startY < winheight/3 )
            item.focusNum = 0;
         else if( startX > winwidth*2/3 && startX < winwidth*11/12 
               && winheight*3/8 && startY < winheight*5/8 )
            item.focusNum = 1;
         else if( startX > winwidth*3/8 && startX < winwidth*5/8 
               && startY > winheight*2/3 && startY < winheight*11/12 )
            item.focusNum = 2;
         else if( startX > winwidth/12 && startX < winwidth/3 
               && startY > winheight*3/8 && startY < winheight*5/8 )
            item.focusNum = 3;
         else if( startX > 3*winwidth/8 && startX < 5*winwidth/8
               && winheight*3/8 && startY < winheight*5/8 )
            item.focusNum = 4;



      }   
   }

   // mouse up
   // remove mousemove and mouseup listener
   function mouseUp(e){


      // remove listener
      item.html[0].removeEventListener("mousemove", mouseMove);
      item.html[0].removeEventListener("mouseup", mouseUp);

      // remove rect
      // rect.parentNode.removeChild(rect);
      $(rect).remove();

      
      
      var sw = item.prj.fromContainerPixelToLatLng(new google.maps.Point(left, top+height));
      var ne = item.prj.fromContainerPixelToLatLng(new google.maps.Point(left+width, top));
      var bnds = new google.maps.LatLngBounds(sw, ne);
      // add new child
      item.add( new Node( item.level +1, bnds ) );

      addRect();
      //console.log(left, top, width, height);


   }

   // mousemove
   // update width & height
   function mouseMove(e){
      width = ((e.pageX-parseInt(item.html.offset().left)*item.zoom)/item.zoom - startX);
      //height = ((e.pageY-parseInt(item.html.offset().top)*item.zoom)/item.zoom - startY);
      height = width*winheight/winwidth;
      //console.log(e.pageX, e.pageY, startX, startY, width, height);

      left = width < 0 ? e.pageX : left;
      top = height < 0 ? e.pageY : top;

      rect.style.left = left + "px";
      rect.style.top = top + "px";
      rect.style.width = Math.abs(width) + "px";
      rect.style.height = Math.abs(height) + "px";

      width = Math.abs(width);
      height = Math.abs(height);

   }


   function addRect(){

      // add rect 
      item.rect.push([left, top, Math.abs(width), Math.abs(height)]);
      var index = item.rect.length - 1;

      // 
      var tempcanvas = document.createElement('canvas');
      tempcanvas.width = item.rect[index][2];
      tempcanvas.height = item.rect[index][3];

      // init drawing
      var ctx=tempcanvas.getContext("2d");
      ctx.lineWidth = 10;
      ctx.strokeStyle = borderColor[item.childStyle];
      ctx.strokeRect(0,0, item.rect[index][2],item.rect[index][3]);


      $(tempcanvas).css("top", item.rect[index][1]+"px")
               .css("left", item.rect[index][0]+"px")
               .addClass("rectCanvas");

      item.html.append(tempcanvas);

      
   }

   // full screen
   item.fullscreen.click(function(){

      if(item.isfull){

         item.isfull = false;
         item.zoom = item.tempZoom;
         item.html.css("zoom", childZoom);
      }
      else{

         item.isfull = true;
         item.zoom = 1;
         item.html.css("zoom", 1);

         // scroll page
         $("#page-2").scrollTop($("#page-2").scrollTop() + item.html.offset().top);

      }
         
   });

   // delete 
   item.deleteBtn.click(function(){

      item.traverse( function(node){

         node.html.remove();
         node.parent.children.splice( node.parent.children.indexOf(node), 1 );

      })

   });

}


Node.prototype.add = function(item){

   this.children.push(item);
   item.style = item.childStyle = this.childStyle;
   item.parent = this;
   item.init(item);
   item.genNum = this.focusNum;
   return item;
}

Node.prototype.remove = function( callback ){


   callback && callback( this );

   this.children.forEach(function(node){

      node.parent.children.splice( node.parent.children.indexOf(node), 1 );
      node.html.remove();

      node.remove( callback );
   })

      

}

Node.prototype.traverse = function( callback ){

   callback && callback( this );

   this.children.forEach(function(node){

      node.traverse( callback );
   })
};

Node.prototype.updateMarker = function(  ){

   var self = this;

   self.markerArray.forEach( function(node) {

      // marker lat and lng
      var latlng = self.prj.fromContainerPixelToLatLng(
                           new google.maps.Point(rectPoint[node.index][0], rectPoint[node.index][1]));

      // create marker
      node.marker.setPosition(latlng);

 

   })


};





      





// class marker
var Marker = function( index, self ){

   this.index = index;

   // marker lat and lng
   var latlng = self.prj.fromContainerPixelToLatLng(
                        new google.maps.Point(rectPoint[index][0], rectPoint[index][1]));

   // create marker
   this.marker = new google.maps.Marker({
                  position: new google.maps.LatLng(latlng.lat(), latlng.lng()),
                  map: self.map,
                  index: index,
                  icon: this.createMarker(rectWidth, rectHeight)
               });

   google.maps.event.addListener(this.marker, 'mouseover', function() {
      self.focusNum = this.index;
   });

}

// draw marker on a canvas
Marker.prototype.createMarker = function(width, height) {

   var canvas, context;

   canvas = document.createElement("canvas");
   canvas.width = width;
   canvas.height = height;

   context = canvas.getContext("2d");

   context.clearRect(0,0,width,height);

   // border is black
   context.strokeStyle = "rgba(0,0,0,0.2)";
   context.lineWidth = 10;
   context.rect(0,0,width,height);

   context.stroke();

   return canvas.toDataURL();

}

// clear marker
Marker.prototype.clear = function() {
   this.marker.setMap(null);
}




$(".restart").click(function(){
   document.location.href = "http://localhost:8888/" ;
})



var val = getUrlVars();
childNum = parseInt(val["child"]);
levelNum = parseInt(val["level"]);
$("#level span").html(levelNum);
$("#child span").html(childNum);
console.log(levelNum, childNum);
// Read a page's GET URL variables and return them as an associative array.
function getUrlVars()
{
    var vars = [], hash;
    var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
    for(var i = 0; i < hashes.length; i++)
    {
        hash = hashes[i].split('=');
        vars.push(hash[0]);
        vars[hash[0]] = hash[1];
    }
    return vars;
}

initMap();
var root;
function initMap(){

   generateTarget();

   // init level <li>
   for(var i = 0; i<levelNum; i++){
      $("#page-2 ul").append("<li id='level"+i+"' class='level'></li>");
   }

   root = new Node( 0 );
   root.init(root);

}

