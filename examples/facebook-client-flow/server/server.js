var express = require('express');
var oauth = require('../../../src/oauth');
//var querystring = require('querystring');
require('longjohn');//just for debugging
var app = express();

var commonConfig = {
	baseUrl: "http://localhost:3000"
}

var fbConfig = {
	secret: "3984260596e84df679d7ea631bca543d",
	clientId: "485486754943048",
	redirectPath: "/login/facebookRedirectTarget"
}

oauth.common.configure(commonConfig);
oauth.fb.configure(fbConfig);

app.use('/login', express.static('../ui/login.html'));

app.get('/login/facebook', function(req, res){
	if(req.query.hasOwnProperty('access_token')){
		//we got an auth code from fb! Now time to exchange it for a token!
		oauth.fb.inspectToken(req.query.access_token)
		.then(function(resp){
			return oauth.fb.getUserInfo(resp.access_token);
		})
		.then(function(resp){
			res.send(resp);
		})
		.catch(function(e){
			console.log('error on redirect:', e);
			res.json({status: "failed"});
		});
	}else{
		res.json({status: "failed login"});
	}
});

var server = app.listen(3000, function () {

  var host = server.address().address;
  var port = server.address().port;

  console.log('Example app listening at http://%s:%s', host, port);

});