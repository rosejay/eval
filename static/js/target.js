	
	// generate target location
	var targetNum,    // target number from 0-255
		target = [],   // target position 
		targetMarker;

	var message = Math.floor(Math.random()*1000000);

	function generateTarget(){

		targetNum = Math.floor( Math.random() * Math.pow(childNum, levelNum) );  
		for( var i = 0; i<levelNum; i++){

			target[i] = Math.floor(targetNum / Math.pow(childNum, (levelNum - 1 - i)));
			targetNum = targetNum % Math.pow(childNum, (levelNum - 1 - i));
		}
		console.log("target", target);
	}