var express = require('express'),
	http = require('http'),
	mongo = require('mongodb'),
    app = express.createServer();

var db;
mongo.connect('mongodb://localhost:27017/tweet', function(err, conn){
	db = conn;
});

var util = require('util'),
	twitter = require('twitter');
var twit = new twitter({
	consumer_key:         'XhFoXdqGMmsU9RmjmNJg'
  , consumer_secret:      '4a8XyMFL1CSMsl6WfdTiQfPpAso3oZ50x0RzYVQVoY'
  , access_token:         '225658518-fWLb4MyM7nBxfnWx94uyToC54rDvxgehzK5ZHdV8'
  , access_token_secret:  'yd0DGsu5Mx5YEbDS71Br91huSbKCxoRtf5KJ9miTY'
});

app.use(express.static(__dirname+'/static'));
app.use(express.bodyParser());
app.use(express.cookieParser());

app.get('/get/users', function(req, res){
	console.log("ddd");
	twit.stream('statuses/sample', function(stream) {
		stream.on('data', function(data) {
			console.log("ddddd");
			console.log(data);
		});
	});
	
});

app.get('/get/tweets', function(req, res){
	console.log("d",req.query.m);
	if(req.query.p!=1)
		twit.search(req.query.txt, { max_id: req.query.m, page: req.query.p, rpp: 100, result_type: 'recent' }, function(data) {
			console.log(data.next_page);
			console.log(data.max_id);
			console.log(data.max_id_str);
			res.send({
				data: data
			});
		});
	else
		twit.search(req.query.txt, { rpp: 100, result_type: 'recent' }, function(data) {
			console.log(data.next_page);
			console.log(data.max_id);
			console.log(data.max_id_str);
			console.log(data.length);
			res.send({
				data: data
			});
		});
});

app.get('/get/tweets/db', function(req, res){

	db.collection('tweet').find({ "topic" : req.query.txt })
		.toArray(function(err, result){

			res.send({
				err : null,
				result : result
			})
		})
});




app.listen(8888);