# Open GeoSocial Consumer Guide

## Pre-requisites

### Facebook Application Registration

The “Application” or publishing service needs an Id and secret that can be used for security and the sharing of data through social networks.  We will be using Facebook for this purpose.
As a developer, you will need to sign up for Facebook Account if you do not have one.

Go to www.facebook.com.
If you see the signup form, fill out your name, birthday, gender and email address. If you don't see the form, click Sign Up, then fill out the form.
Pick a password.
Click Sign Up.
After you complete the signup form, we'll send an email to the address you provided. To complete the signup process, click the confirmation link.

Login and Create a New Application
	Go to https://developers.facebook.com/
	Under Apps menubar tab, select “Create a New App”
	Fill out dialog information
	Congratulations.  You now have a fbAppId and fbAppSecret 
	Under setting: You also have an Application namespace

Under Open Graph, you can define Object types, Action Types and Stories
Fill this out later….

## Code Example

Hawk is an HTTP authentication scheme using a message authentication code (MAC) algorithm to provide partial HTTP request cryptographic verification.  Consumer applications are required to provide credentials to get access to the products.

Example:<br/>
var credentials = {<br/>
&nbsp;&nbsp;	id:  		app_id,<br/>
&nbsp;&nbsp;	key: 		app_secret,<br/>
&nbsp;&nbsp;	algorithm: 'sha256'<br/>
}<br/>

Consumer applications will use their Facebook Id and a Facebook access token as a key (rather than provide their secret).  An Access Token can be easily obtained by the application from Facebook directly and used for all secured transactions.  SHA-256 is the preferred algorithm to use.
The consumer application will also pass the user email as part of an extended field in the authorization header

// Generate Authorization request header  <br/>
var header = Hawk.client.header('http://example.com:8000/resource/1?b=1&a=2', 'GET', {<br/> 
&nbsp;&nbsp;	credentials: credentials, <br/>
&nbsp;&nbsp;	ext: ‘pat@cappelaere.com'<br/>
});<br/>

var options = {<br/>
&nbsp;&nbsp;  uri:  	url,<br/>
&nbsp;&nbsp;  method: 	'GET',<br/>
&nbsp;&nbsp;  headers: {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;    authorization: header.field<br/>
&nbsp;&nbsp;  }<br/>
};<br/>

Request(options, function(err, response, body){<br/>
&nbsp;&nbsp;if( !err ) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;		var isValid = Hawk.client.authenticate(response, credentials, header.artifacts, { payload: body });<br/>
&nbsp;&nbsp;&nbsp;&nbsp;		if( isValid ) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;			try{<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;			  var json = JSON.parse(body)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;			  cb(null, json)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;			} catch(e) {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;			  cb(-1,null)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;			}<br/>
&nbsp;&nbsp;&nbsp;&nbsp;		} else {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;			cb(-1,null);<br/>
&nbsp;&nbsp;&nbsp;&nbsp;		}<br/>
&nbsp;&nbsp;	} else {<br/>
&nbsp;&nbsp;&nbsp;&nbsp;		console.log("Request error", err)<br/>
&nbsp;&nbsp;&nbsp;&nbsp;		cb(err, null)<br/>
&nbsp;&nbsp;	}<br/>
})<br/>

A publisher will be able to determine the Application id and user email from the Authentication header information.
  
