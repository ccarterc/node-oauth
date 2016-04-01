var configCommon = require('../config-common');
var assert = require('assert');

describe('config-common', function() {
  describe('.configure(config)', function () {
    it('should set .baseUrl', function () {
    	var baseUrl = "http://testing.com";
    	configCommon.configure({
    		baseUrl: baseUrl
    	});
		assert.equal(configCommon.baseUrl, baseUrl);
    });
    it('should URIEncode .baseUrl and make it available on .baseUrlUri', function () {
    	var baseUrl = "http://testing.com";
    	configCommon.configure({
    		baseUrl: baseUrl
    	});
		assert.equal(configCommon.baseUrlUri, "http%3A%2F%2Ftesting.com");
    });
  });
});