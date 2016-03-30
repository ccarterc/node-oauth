var configurable = {
	baseUrl: ""
};

var nonConfigurable = {
	baseUrlUri: ""
};

function mergeObj(obj1, obj2){
	//merge props from obj1 into obj2
	for (var attrname in obj1) { obj2[attrname] = obj1[attrname]; }
	//put all the obj2 props onto the exports obj
	for (var attrname in obj2) { exports[attrname] = obj2[attrname]; }
}

function compute(){
	exports.baseUrlUri = function(){
		return encodeURIComponent(configurable.baseUrl);
	}();
}

exports.baseUrl = "",
exports.baseUrlUri = ""
exports.configure = function(config){
	mergeObj(config, configurable);
	compute();
}

