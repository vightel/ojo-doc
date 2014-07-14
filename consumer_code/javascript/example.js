var request = require('request');
var assert	= require('assert');
var hawk 	= require('hawk');
var graph 	= require('fbgraph');

// User email
var email 			= "pat@cappelaere.com"

// Get Consumer Facebook ID and Secret from Environment Variables
var appId			= process.env.fbAppId
var appSecret		= process.env.fbSecret
var accessToken		= undefined
assert(appId)
assert(appSecret)


appToken			= appId + "|" + appSecret
graph.setAccessToken( appToken )

function opensearch() {
	var url = "http://ojo-bot.herokuapp.com/products/opensearch?q=landslide_forecast&lat=18.89&lon=-69.96&startTime=2014-05-05&endTime=2014-06-04&limit=1"

	var credentials = {
		id:  		appId,
		key: 		accessToken,
		algorithm: 'sha256'
	}

	var header = hawk.client.header(url, 'GET', { 
		credentials: credentials, 
		ext: email });
	var options = {
	    uri:  	url,
	    method: 'GET',
	    headers: {
	        authorization: header.field
	    }
	};
	
	request(options, function(err, response, body){
		if( !err ) {
			// Validate response back from server
	        var isValid = hawk.client.authenticate(response, credentials, header.artifacts, { payload: body });
			if( isValid ) {
				console.log("body:"+body)
			} else {
				console.log("Invalid Server Return")
			}
		} else {
			console.log("Request Error:", err)
		}
	})
}

//
// Exchange AppToken for AccessToken to use as veryfiable key
//
graph.authorize({
	"client_id":      appId,
	"client_secret":  appSecret,
	"grant_type": 	  "client_credentials"
}, function (err, result) {
	console.log("new access token:", result.access_token);
	accessToken = result.access_token
	opensearch()
})