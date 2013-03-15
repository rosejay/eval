==============
tweetZoom 
==============
Ye Lin & Sai
==============

## File Directories of [storyboard_lin]

`node_modules` - required documents of web application framework for node [express] (http://expressjs.com/)

`static` - index.html - 
	 - `js` /  `database.js` `map.js` `marker.js` `style.js` - includes the main javascript codes
	 - `css` / `main.css`- includes the main css
	 - `img` / - includes images 
	 - `material` / test images only `.jpeg` files can be read 

`server.js` - node server

`fetch.js` - code for fetch tweets

`tweet.json` - database

## Instructions for Running Project

1 Install [Node.js] (http://nodejs.org/)

2 Install [Mangodb](http://www.mongodb.org/)

3 Import database tweet.json
	
	in terminal: mongoimport --collection tweet --file tweet.json

4 Run the server under the folder of [tweetZoom] server.js
	
	in terminal : node server.js

5 Open a browse and type in [http://localhost:8888] (http://localhost:8888)
