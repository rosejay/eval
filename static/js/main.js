	

	var childNum,   // children number for each level
		levelNum;   // maximum level number

	var initZoomLevel = 3,
		zoom = initZoomLevel,	// google map zoom value
		level = zoom - 3,	// my level value
		focus;	// focus area index

	var winwidth = window.innerWidth,	// windows width
		winheight = window.innerHeight;	// windows height

	var rectWidth = winwidth/4,		// rect marker width
		rectHeight = winheight/4;	// rect marker height
	var markerArray = [];			// four rect marker

	// def of marker rect and marker center points
	var rectPoint =[[ winwidth/2, winheight/3 ],
					[ winwidth*5/6, winheight*5/8 ],
					[ winwidth/2, winheight*11/12 ],
					[ winwidth/6, winheight*5/8 ],
					[ winwidth/2, winheight*5/8 ]];

	
	function initMap(){

		generateTarget();

		// init map
		var html = $("<div class='map' style='width:" + (winwidth) + "px;height:" + (winheight) + "px'></div>");
		var mapOptions = {
			mapTypeControl: false,
			scaleControl: false,
			center: new google.maps.LatLng( 30, 50 ),
			zoom: initZoomLevel,
			mapTypeId: google.maps.MapTypeId.ROADMAP,
			streetViewControl: false,
        	zoomControl: false,
			panControl: false
		};



		// Create map 
		var map = new google.maps.Map(html[0], mapOptions);
		map.setOptions({styles: mapStyles[Math.floor(Math.random()*5)]});

		// add div level
	    $("#page-2").append(html);

		// Create overlay
	    var overlay = new google.maps.OverlayView();
		overlay.draw = function () {};
		overlay.onAdd = function() {};
		overlay.onRemove = function () {};
		overlay.setMap(map);
		var projection;

		var times = true;
		// Wait for idle map
		google.maps.event.addListener(map, 'idle', function() {
		    

			

		    // Get projection
			projection = overlay.getProjection();
			var latlng = projection.fromContainerPixelToLatLng(new google.maps.Point(rectPoint[0][0], rectPoint[0][1]));

			if(times){
				generateMarker();
				times = false;
			}

			google.maps.event.addListener(map, 'bounds_changed', clearMarker);

			// set zoom 3 as max
			var z = map.getZoom();
			level = z - 3;
			
			if ( z<=3 ) {
				z = 3;
				level = z-3;
				map.setZoom(z);
				map.setCenter(new google.maps.LatLng( 30, 50 ));
				generateMarker();
			}
			else if( z > 3+levelNum ){
				z = 3+levelNum;
				level = z-3;
				map.setZoom(z);

			}
			else{

				// if zoom out 
				if(z<zoom){
					generateMarker();
				}
				else{
					//console.log(target[level-1] , focus, "important", z+1 , 3+levelNum)
					// if it's the right path
					if(target[level-1] == focus){

						// if it is the target!
						if(z+1 == 3+levelNum ){

							// set target marker
			                $("#targetNum").html(message);
			                $(".finish").fadeIn();
			            }
						else{ // else it's not yet reached the target but display the rect
							generateMarker();
						}
					}
				}
			}

			$(".zoom span").html(level);
			zoom = z;

		});


		
		function generateMarker(){

			// clear
			clearMarker();

			// generate
			for(var i = 0; i<childNum; i++){
				markerArray.push( new Marker(i) );
			}
		}
			
		// clear markerArray
		function clearMarker(){

			// clear rect
			for (var i = 0; i < markerArray.length; i++ ) {
				markerArray[i].clear();
			}
			markerArray = [];

		}
		
		// class marker
		var Marker = function( index ){

			this.index = index;

			// marker lat and lng
			var latlng = projection.fromContainerPixelToLatLng(
										new google.maps.Point(rectPoint[index][0], rectPoint[index][1]));

			// create marker
			this.marker = new google.maps.Marker({
								position: new google.maps.LatLng(latlng.lat(), latlng.lng()),
								map: map,
								index: index,
								icon: this.createMarker(rectWidth, rectHeight)
							});

			google.maps.event.addListener(this.marker, 'mouseover', function() {
				focus = this.index;
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
	initMap();
	

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




