var Q = require('q');
var http = require('http');
var https = require('https');
var config = require('./config-fb');
var commonConfig = require('./config-common');
var querystring = require('querystring');

exports.getUserInfo = function(token){
	var deferred = Q.defer();
  	var reqHttps = https.request({
    	host: config.apiUrl,
    	port: 443,
    	path: '/v2.3/me?access_token='+token,
    	method: 'GET'
  	},
  	function(response) {//https://graph.facebook.com/v2.2/me
    	var body = '';
    	response.on('data', function(d) {
      		body += d;
    	});
    	response.on('end', function() {
      		body = JSON.parse(body);
      		deferred.resolve({userInfo: body, access_token: token});
    	});
  	});
  	reqHttps.end();
  	reqHttps.on('error', function(e){
    	console.log('errors: ', e);
  	});
  	//then take the user id and call the graph api: https://developers.facebook.com/docs/graph-api/reference/v2.2/user

  	return deferred.promise;
};

exports.inspectToken = function(access_token){
	console.log('inspectToken access_token: ', access_token);
	var deferred = Q.defer();
	  	//take the access_token and call the inspect token api:
	  	var reqHttps = https.request({
	    	host: config.apiUrl,
	    	port: 443,
	    	path: '/debug_token?input_token='+access_token+'&access_token='+access_token,
	    	method: 'GET'
	  	},
	  	function(response) {
	    	var body = '';
	    	response.on('data', function(d) {
	      		body += d;
	    	});
	    response.on('end', function() {
	    	console.log('inspectToken body: ', body);
	      	deferred.resolve({tokenInfo: body, access_token: access_token});
		});
	});
	reqHttps.end();
	reqHttps.on('error', function(e){
	    console.log('errors: ', e);
	});

	return deferred.promise;
};

exports.exchangeCode = function(code){
  	var deferred = Q.defer();
  	var reqHttps = https.request({
    	host: config.apiUrl,
    	port: 443,
    	path: '/oauth/access_token?client_id='+config.clientId+'&client_secret='+config.secret+'&code='+code+'&redirect_uri='+encodeURI(commonConfig.baseUrl+config.redirectPath),
    	method: 'GET'
  	}, function(response) {
      console.log('starting callback def in exchangeCode()');
    	var body = '';
    	response.on('data', function(d) {
      		body += d;
    	});
    	response.on('end', function() {
        console.log('end exchangeCode()');
			// Data reception is done, do whatever with it!
      		var obj = querystring.parse(body);
      		deferred.resolve(obj.access_token);
    	});
  	});
  	reqHttps.end();
    //console.log('reqHttps:', reqHttps);
  	reqHttps.on('error', function(e){
    	console.log('errors: ', e);
  	});
  	return deferred.promise;
};