
var http = require('http'),
	mongo = require('mongoskin');

var util = require('util'),
	twitter = require('twitter');
var twit = new twitter({
	consumer_key:         'XhFoXdqGMmsU9RmjmNJg'
  , consumer_secret:      '4a8XyMFL1CSMsl6WfdTiQfPpAso3oZ50x0RzYVQVoY'
  , access_token:         '225658518-fWLb4MyM7nBxfnWx94uyToC54rDvxgehzK5ZHdV8'
  , access_token_secret:  'yd0DGsu5Mx5YEbDS71Br91huSbKCxoRtf5KJ9miTY'
});

var db = mongo.db('localhost:27017/tweet?auto_reconnect');
var coll = db.collection('tweet');



function getTweets(search, page, max, limit){
	var page = page || 0,
		limit = limit || 100,
		max = max || "";

	if(page == 0){

		twit.search(search, { rpp: limit, result_type: 'recent' }, function(data) {

			checkTweets(data);
		})

	}
	else{

		twit.search(search, { max_id: max, page: page, rpp: limit, result_type: 'recent' }, function(data) {

			checkTweets(data);
		})

	}
	function checkTweets(data){

		//console.log("td",data.results);
		if( !data.results){
			return;
		}

		function walk(index){


			var tweets = data.results[index];

			if( ! tweets){
				console.log(index);
				return;
			}
			if( tweets.geo && (tweets.geo.coordinates[0] || tweets.geo.coordinates[1]) ){

				coll.findOne({
					id : tweets.id
				}, function(err, result){
					if(err){
						throw err;
					}

					if( ! result){

						tweets.topic = search; // important!
						tweets.id = tweets.id;
						tweets.lat = tweets.geo.coordinates[0];
						tweets.lng = tweets.geo.coordinates[1];
						tweets.content = tweets.text;
						tweets.username = tweets.from_user;
						tweets.profileimage = tweets.profile_image_url;
						tweets.time = tweets.created_at;
						tweets.url = tweets.source;

						coll.save(tweets, function(err, result){
							console.log('inserted ');
							walk(index+1);
						})
					}
				})

			}
			else
				walk(index+1);	
		}

		walk(0);
		
		if(data.page<15){
			console.log(data.page);
			getTweets(search, data.page+1, data.max_id, limit);
		}
		else{
			console.log("end");
			return;
		}



	}
		



}

var topicList = ['ted','paris','CHI2013','obama','china','happy','apple','twitter','facebook'];

topicList.forEach(function(topic){

	getTweets(topic);
})
