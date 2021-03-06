var http = require('http');
var https = require('https');
var config = require('./config-google');
var commonConfig = require('./config-common');

//This https request can be bypassed by doing a jwt auth locally using certs
//https://developers.google.com/identity/protocols/OpenIDConnect#obtainuserinfo
// use google certs to avoid making an https request to google to validate a token (https://developers.google.com/identity/protocols/OpenIDConnect#discovery)
exports.inspectToken = (token)=>{
  return new Promise((resolve, reject)=>{
  	var reqHttps = https.request({
		host: config.apiUrl,
		port: 443,
		path: '/oauth2/v1/tokeninfo?id_token='+token,
		method: 'GET'
	},
	(response)=>{
		// Continuously update stream with data
		var body = '';
		response.on('data', (d)=>{
		  body += d;
		});
		response.on('end', ()=>{
			try{
				body = JSON.parse(body);
				if(body.hasOwnProperty('email_verified') && body.email_verified === true){
			  		resolve({accessToken: token, userData: body});
			  	}else{
			  		reject({msg: 'Email not verified', e: body});
			  	}
			}catch(e){
				reject('Email not verified or couldnt parse');
			}
		});
	});

	//reqHttps.write(path);
	reqHttps.end();
	console.log('req:', reqHttps);
	reqHttps.on('error', (e)=>{
		console.log('errors: ');
		reject(e);
	});
  });
};

exports.exchangeCode = (code)=>{
	return new Promise((resolve, reject)=>{
		var path = 'code='+code+'&';
		path += 'client_id='+config.clientId+'&';
		path += 'client_secret='+config.secret+'&';
		path += 'redirect_uri='+commonConfig.baseUrl+config.redirectPath+'&';
		path += 'grant_type=authorization_code';

		var reqHttps = https.request({
			host: config.apiUrl,
			port: 443,
			path: '/oauth2/v3/token',
			method: 'POST',
			headers: {
			  "Content-Type": "application/x-www-form-urlencoded",
			  "Content-Length": path.length
			}
		},
		(response)=>{
			// Continuously update stream with data
			var body = '';
			response.on('data', (d)=>{
			  body += d;
			});
			response.on('end', ()=>{
			  body = JSON.parse(body);
			  resolve(body);
			});
		});

		reqHttps.write(path);
		reqHttps.end();
		reqHttps.on('error', (e)=>{
			console.log('errors: ', e);
			reject(e);
		});
	});
}

