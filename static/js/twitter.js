
	
	var searchTopic;
	var page_num = 1; // max: 14


	init();
	function init () {
		$("#searchText").focus();

	}

	$("#searchText").keyup(function(event) {  
  		if(event.keyCode==13){  
        	$(".search-btn").click();
		}  
 	}); 

	$(".search-btn").click(function(){

		if($("#searchText").val()){

			takeAction();

			searchTopic = $("#searchText").val();

			var max_id = "1";
			var page_id = 1;
			var newsFeed = [];

			getFeed(max_id, page_id, function(model){
          		$(".searchbar").animate({ left:-600 },150);
          		$("body").css("background", "#eee");
          		// map
				newCanvas(0, newsFeed);
				clearAction();
				//generateUI();
				$("#page-2").fadeIn(150);
		    }); 
			function getFeed(max, page, callback){  
				console.log(max, page, searchTopic);
				$.get("http://localhost:8888/get/tweets", { txt: searchTopic, p: page, m: max}, function(res){
					if(res.data.error){
						callback(res);
					}
					else{
						for(var i = 0; i<res.data.results.length; i++){
							if(res.data.results[i].geo!= null){
								console.log("//",res.data.results[i].geo.coordinates[0], res.data.results[i].geo.coordinates[1]);
								newsFeed.push(res.data.results[i]);
							}
							else{

							}
						}
						//console.log("//",res.data.next_page);
						//console.log("d",newsFeed.length);
						if(page_id>page_num || res.data.results.length == 0)
			            	callback(res);
			            else{
			            	max_id = res.data.results[0].id;
			            	page_id = res.data.page+1;
			            	getFeed(max_id, page_id, callback);
			            }
					}
						
		        });
			}
			function generateUI(){
				var tempHTML = "";
				for(var i=0; i<newsFeed.length; i++){

					var username = newsFeed[i].from_user;
					var content = newsFeed[i].text;

					content = content.replace(searchTopic, '<span>'+searchTopic+'</span>');
					console.log(searchTopic, content);

					var x = newsFeed[i].geo.coordinates[0]*3+200;
					var y = newsFeed[i].geo.coordinates[1]*3;

					tempHTML = "<div class='spot-2' style='top:"+y+"px; left:"+x+"px'>\
						<div class='spot-2-inner'>\
							<p><span><a href='http://twitter.com/"+ username +"'>"+ username +"</a></span>\
							"+ content +"</p>\
						</div>\
						<div class='tri'></div>\
					</div>";

					$('body').append(tempHTML);
				}

				clearAction();
			}
		}

		
	});

	function takeAction () {
		$(".loading-outer").fadeIn(150);
	}
	function clearAction(){
		$(".loading-outer").fadeOut(150);
	}
