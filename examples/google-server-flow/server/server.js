var express = require('express');
var oauth = require('../../../src/oauth');
//var querystring = require('querystring');
require('longjohn');//just for debugging
var app = express();

var commonConfig = {
	baseUrl: "http://localhost:3000"
}

var googleConfig = {
	clientId: "165926554192-kpc635lu35941q8dfs5tmleqaafqstl9.apps.googleusercontent.com",
  	secret: "ulYP2nvN129J5baPplMwv8qE",
  	redirectPath: "/login/googleRedirectTarget",
  	scope: "openid%20email",
  	state: "ThisIsWhereCsrfTokenShouldGo"
};

oauth.common.configure(commonConfig);
oauth.google.configure(googleConfig);

app.use('/login', express.static('../ui/login.html'));

app.get('/googleDialog', function(req, res){
	res.send(oauth.google.dialog);
});

app.get('/login/googleRedirectTarget', function(req, res){
	if(req.query.hasOwnProperty('code')){
		oauth.google.exchangeCode(req.query.code)
		.then(function(resp){
			return oauth.google.inspectToken(resp.id_token);
		})
		.then(function(resp){
			res.send(resp);
		})
		.catch(function(e){
			console.log('error:', e);
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