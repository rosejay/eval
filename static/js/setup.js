	
	var technique,
		childNum,
		levelNum;
	// set up
	$(".num").click(function(){

		if($(this).hasClass("lev"))
			$(".lev").removeClass("sel");
		else if($(this).hasClass("chi"))
			$(".chi").removeClass("sel");
		else if($(this).hasClass("tech"))
			$(".tech").removeClass("sel");

		$(this).addClass("sel");
	});

	$(".ok").click(function(){

		if($(".tech.sel").length){
			technique = $(".tech.sel").html();
			if($(".chi.sel").length)
				childNum = parseInt( $(".chi.sel").html() ); 
				if($(".lev.sel").length)
					levelNum = parseInt( $(".lev.sel").html() );

			$(".setup").fadeOut();
			window.location.href = "http://localhost:8888/" + technique + ".html?child=" + childNum + "&level=" + levelNum;
		}	
		else
			alert("Please set up data first. Thanks!");

	});