var http = require('http');
var https = require('https');
var config = require('./config-fb');
var commonConfig = require('./config-common');
var querystring = require('querystring');

exports.getUserInfo = (token)=>{
  return new Promise((resolve, reject)=>{
    var reqHttps = https.request({
      host: config.apiUrl,
      port: 443,
      path: '/v2.3/me?access_token='+token,
      method: 'GET'
    },
    (response)=>{//https://graph.facebook.com/v2.2/me
      var body = '';
      response.on('data', (d)=>{
          body += d;
      });
      response.on('end', ()=>{
          body = JSON.parse(body);
          resolve({userInfo: body, access_token: token});
      });
    });
    reqHttps.end();
    reqHttps.on('error', (e)=>{
      console.log('errors: ', e);
      reject(e);
    });
    //then take the user id and call the graph api: https://developers.facebook.com/docs/graph-api/reference/v2.2/user
  });
};

exports.inspectToken = (access_token)=>{
  return new Promise((resolve, reject)=>{
    var reqHttps = https.request({
      host: config.apiUrl,
      port: 443,
      path: '/debug_token?input_token='+access_token+'&access_token='+access_token,
      method: 'GET'
    },
    (response)=>{
      var body = '';
      response.on('data', (d)=>{
          body += d;
      });
      response.on('end', ()=> {
        console.log('inspectToken body: ', body);
          resolve({tokenInfo: body, access_token: access_token});
      });
    });
    reqHttps.end();
    reqHttps.on('error', (e)=>{
      console.log('errors: ', e);
      reject(e);
    });
  });
};

exports.exchangeCode = (code)=>{
  return new Promise((resolve, reject)=>{
    var reqHttps = https.request({
      host: config.apiUrl,
      port: 443,
      path: '/oauth/access_token?client_id='+config.clientId+'&client_secret='+config.secret+'&code='+code+'&redirect_uri='+encodeURI(commonConfig.baseUrl+config.redirectPath),
      method: 'GET'
    }, (response)=>{
      console.log('starting callback def in exchangeCode()');
      var body = '';
      response.on('data', (d)=>{
          body += d;
      });
      response.on('end', ()=>{
        console.log('end exchangeCode()');
      // Data reception is done, do whatever with it!
          var obj = querystring.parse(body);
          resolve(obj.access_token);
      });
    });
    reqHttps.end();
    //console.log('reqHttps:', reqHttps);
    reqHttps.on('error', (e)=>{
      console.log('errors: ', e);
      reject(e);
    });
  });
};