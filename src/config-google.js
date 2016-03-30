var commonConfig = require('./config-common');

// https://developers.google.com/identity/protocols/OAuth2UserAgent

var nonConfigurable = {
	apiUrl: 'www.googleapis.com'
};
// state is where csrf token should go and be verified in response
// audience should be checked in token validation response to handle confused deputy attacks (it should be your app id)
var configurable = {
	clientId: "",
  	secret: "",
  	redirectPath: "",
  	scope: "openid%20email",
  	state: "ThisIsWhereCsrfTokenShouldGo",
  	audience: "YOUR_APP_ID"
};

function mergeObj(obj1, obj2){
	//merge props from obj1 into obj2
	for (var attrname in obj1) { obj2[attrname] = obj1[attrname]; }
	//put all the obj2 props onto the exports obj
	for (var attrname in obj2) { exports[attrname] = obj2[attrname]; }
}

function compute(){
	exports.dialog = function(){
		return "https://accounts.google.com/o/oauth2/auth?" +
"client_id=" + configurable.clientId +
"&response_type=code" +
"&scope=" + configurable.scope +
"&redirect_uri=" + encodeURIComponent(commonConfig.baseUrl + configurable.redirectPath) +
"&state=" + configurable.state;
	}();
}

exports.clientId = "";
exports.secret = "";
exports.redirectPath = "";
exports.scope = configurable.scope;
exports.state = configurable.state;
exports.dialog = "";
exports.apiUrl = nonConfigurable.apiUrl;

exports.configure = function(config){
  	mergeObj(config, configurable);
  	compute();
  	console.log('google config:', exports);
};