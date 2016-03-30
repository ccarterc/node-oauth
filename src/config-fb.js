var commonConfig = require('./config-common');

var configurable = {
	secret: "",
	clientId: "",
	redirectPath: ""
};

var nonConfigurable = {
	apiUrl: "graph.facebook.com",
	dialog: ""
}

function mergeObj(obj1, obj2){
	//merge props from obj1 into obj2
	for (var attrname in obj1) { obj2[attrname] = obj1[attrname]; }

	//put all the obj2 props onto the exports obj
	for (var attrname in obj2) { exports[attrname] = obj2[attrname]; }
}

var self = this;

function dialogString(){
	return "https://www.facebook.com/dialog/oauth?client_id=" + configurable.clientId +
		"&redirect_uri=" + encodeURI(commonConfig.baseUrl + configurable.redirectPath) +
		"&response_type[]=code" +
		"&response_type[]=granted_scopes" +
		"&scope=public_profile,email";
}

function compute(){
	exports.dialog = dialogString();
}

/*
example dialog string:
https://www.facebook.com/v2.1/dialog/oauth?
client_id=1231546489798
&response_type[]=code
&response_type[]=granted_scopes
&scope=public_profile,email
&redirect_uri=https%3A%2F%2Ftest.api.company.com%2Fdm%2Fv1%2Flogin%2FfacebookRedirectTarget
*/


exports.secret = configurable.secret;
exports.clientId = configurable.clientId;
exports.redirectPath = configurable.redirectPath;
exports.apiUrl = nonConfigurable.apiUrl;
exports.dialog = nonConfigurable.dialog;

exports.configure = function(config){
  	mergeObj(config, configurable);
  	compute();
};
