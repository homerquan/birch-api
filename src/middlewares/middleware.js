var $ = require('./dollar').$,
	_ = require('lodash');
	//rateLimit = require('./rateLimit');

/*
 * Customer middleware
 * 1. log the access
 * 2. check oauth permission and scope by external settings
 * 3. content type negotiation
 */
var logUsage = function(req, res, next) {
	$('logger').info('%s %s %s', Date.now(), req.method, req.url);
	next();
};

// for test
var doNothing = function(req, res, next) {
	next();
};

/**
 * limit usage for each user
 */
// var rateLimit = function(req, res, next) {
// 	var setting = checkConfig($('config').RATE_LIMIT[req.method], req.path) || null;
// 	if (setting) {
// 		rateLimit(req, res, setting, next);
// 	} else {
// 		next();
// 	}
// };

/* 
 * Check the Content-Type for security reason
 * Default is json, decline other types and response error in html
 * allow multipart/form-data for upload only
 */
// var contentTypeNegotiation = function(req, res, next) {
// 	if (req.header('content-type') && req.url.lastIndexOf('/admin?action=upload_schedule_file', 0) === 0) {
// 		next();	
// 	} else if (req.header('content-type') && req.url.lastIndexOf('/image', 0) === 0 && req.header('content-type').lastIndexOf('application/x-www-form-urlencoded', 0) === 0) {
// 		next();
// 	} else if (req.header('content-type') && req.header('content-type').indexOf('application/json') === -1) {
// 		next("The content type is not supported.");
// 	} else {
// 		next();
// 	}
// };

// /*
//  * Check if a path matchs the setting
//  */
// var checkConfig = function(config, path, query) {
// 	return _.find(config, function(rule) {
// 		var result = false;
// 		if (typeof rule === "object" && query) {
// 			result = path.match(new RegExp(rule.path, "i")) && isPartOf(query, rule.query);
// 		} else {
// 			result = path.match(new RegExp(rule, "i"));
// 		}
// 		return result;
// 	});
// };


// /**
//  * Check shared query
//  * such as pagination, extent
//  */
// var checkQuery = function(req, res, next) {
// 	if (req.query.page) {
// 		req.checkQuery('page', 'Invalid getparam').isInt();
// 	}
// 	if (req.query.limit) {
// 		req.checkQuery('limit', 'Invalid getparam').isInt();
// 	}
// 	var errors = req.validationErrors();
// 	if (errors) {
// 		next("invalid query:" + errors);
// 	} else {
// 		req.query.page = parseInt(req.query.page) || $('config').DEFAULT_PAGE_START;
// 		req.query.limit = parseInt(req.query.limit) || $('config').DEFAULT_PAGE_LIMIT;
// 		next();
// 	}
// };

// /*
//  * Check a predefined table to determain if the endpoint will skip oauth check
//  * such as public user profile
//  * SKIP_AUTH is used for debugging in development only
//  */
// var checkOauth = function(req, res, next) {
// 	if ($('config').ALLOW_SUPER_USER && req.query.super_token == $('config').SUPER_USER_TOKEN && req.query.super_user) {
// 		req.user = req.query.super_user || '';
// 		next();
// 	} else if (checkConfig($('config').PUBLIC_ENDPOINTS[req.method], req.path, req.query) || $('config').SKIP_AUTH) {
// 		//overwrite user by ?mock_user=<id> for developing only
// 		req.user = req.query.mock_user || $('config').DEFAULT_MOCK_USER || '';
// 		next();
// 	} else {
// 		passport.authenticate('bearer', {
// 			session: false
// 		})(req, res, next);
// 	}
// };

// /**
//  * get user's client id for multi-tenancy
//  */
// var getClient = function(req, res, next) {
// 	User.findById(req.user).exec(function(err, data) {
// 		if (data && data.client) {
// 			req.client = data.client;
// 			next();
// 		} else {
// 			next();
// 		}
// 	});
// };

// var haltOnTimedout=function(req, res, next) {
// 	if (!req.timedout)
// 		next();
// 	else
// 		next("timeout: try again or service may not avaiable.");
// }

// var middleware = [timeout('10s'), logUsage, checkOauth, getClient, contentTypeNegotiation, checkQuery, haltOnTimedout];

// // In development, no timeout
// if ('development' === $('env')) {
// 	middleware = [logUsage, checkOauth, getClient, contentTypeNegotiation, checkQuery, haltOnTimedout]
// }

//module.exports = middleware;