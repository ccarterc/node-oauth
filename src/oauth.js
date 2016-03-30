var fb = require('./facebook.js');
var google = require('./google.js');
var commonConfig = require('./config-common');
var fbConfig = require('./config-fb');
var googleConfig = require('./config-google');


exports.common = {
	configure: commonConfig.configure
};

exports.fb = {
	configure: fbConfig.configure,
	inspectToken: fb.inspectToken,
	getUserInfo: fb.getUserInfo,
	exchangeCode: fb.exchangeCode
};
Object.defineProperties(exports.fb, {
	dialog: {
		get: function(){return fbConfig.dialog;}
	}
});

exports.google = {
	configure: googleConfig.configure,
	inspectToken: google.inspectToken,
	exchangeCode: google.exchangeCode
};
Object.defineProperties(exports.google, {
	dialog: {
		get: function(){return googleConfig.dialog;}
	}
});