var configFb = require('../config-fb');
var assert = require('assert');

describe('config-fb', function() {
	describe('set key props upon instantiation', function () {
    	it('secret, clientId, redirectPath, apiUrl, dialog', function () {
			assert.equal(configFb.hasOwnProperty('secret'), true);
			assert.equal(configFb.hasOwnProperty('clientId'), true);
			assert.equal(configFb.hasOwnProperty('redirectPath'), true);
			assert.equal(configFb.hasOwnProperty('apiUrl'), true);
			assert.equal(configFb.hasOwnProperty('dialog'), true);
    	});
	});
	describe('.configure(config)', function () {
    	it('should set props for anything you send in', function () {
    		var thing = "http://testing.com";
    		configFb.configure({
    			a: thing,
    			b: thing
    		});
			assert.equal(configFb.a, thing);
			assert.equal(configFb.b, thing);
    	});
  	});
});
