node-oauth2
===========

# oauth2 made easy

This code allows you to verify oauth tokens generated client side or to generate tokens server side.  Below are the examples of how to handle the server code.  Look in the `examples` folder to see full working demos.

## Getting started

You need to enter the `src` directory and run `npm install`

Then you need to require the oauth module: `require('./oauth');`

NOTES: State security token or CSRF's are not implemented and may be required for security reasons depending on your particular implementation to avoid confused deputy attacks.  Google has a method for automagically getting certs to verify you are talking with Google.  For production deployments that magic also requires a caching mechanism which I would like to implement at some point.  Also I made use of the Q npm module to support older versions of node which gave me problems in the Promise realm.  I would say the use of `deffered` was a poor design choice and when I get a chance would like to alter it for modern node with the native Promise pattern.  It doesn't alter functionality though.  Make sure you are logged out of facebook or google before attempting to run this otherwise you will not see the full flow, although you will still get the oauth token and appropriate information back.  Don't forget to setup your SSL prior to implementing any login system even though all calls to the Google or FB are over https by default.  I have used my own personal api keys so that no configuration is necessary to run the examples, so make sure to use your own after setting up appropriate credentials via FB and Google developer dashboards.  Be aware that FB and Google may implement breaking changes in their api's, so ensure that the api's specified in this code match the api versions of FB and Google.  Newer api's may require slight alterations to this code.

### Facebook

#### Set the common configuration:

```
oauth.common.configure({
	baseUrl: "http://localhost:3000"
});
```

#### Set the facebook specific configuration:

```
oauth.fb.configure({
	secret: "YOUR_FB_SECRET",
	clientId: "YOUR_FB_CLIENT_ID",
	redirectPath: "/login/facebookRedirectTarget"
});
```

#### Now you can perform the following operations:

```
//get the dialog link that the client needs to load in a window to allow login through fb
oauth.fb.dialog
```

```
//exchange the auth code for an oauth token
oauth.fb.exchangeCode(auth_code_from_fb_redirect)
.then(function(response){
	console.log('fb exchangeCode response:', response);
})
.catch(function(e){
	console.log('fb exchangeCode error response:', e);
});
```

```
//validate an oauth token
oauth.fb.inspectToken(token)
.then(function(response){
	console.log('fb inspectToken response:', response);
})
.catch(function(e){
	console.log('fb inspectToken error response:', e);
});
```

```
//get user info associated with oauth token
oauth.fb.getUserInfo(token)
.then(function(response){
	console.log('fb getUserInfo response:', response);
})
.catch(function(e){
	console.log('fb getUserInfo error response:', e);
});
```

With chaining a server side flow might look like:
```
oauth.fb.exchangeCode(FB_AUTH_CODE)
.then(oauth.fb.inspectToken)
.then(function(resp){
	return oauth.fb.getUserInfo(resp.access_token);
})
.then(function(resp){
	console.log('getUserInfo response:', resp);
})
.catch(function(e){
	console.log('error:', e);
});
```