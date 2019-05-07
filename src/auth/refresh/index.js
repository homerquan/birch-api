/*
* @Author: Homer
* @Date:   2017-12-21 01:13:15
* @Last Modified by:   Homer
* @Last Modified time: 2017-12-21 01:37:04
*/
"use strict";

import express from "express";
import passport from "passport";
import jwt from 'jsonwebtoken';
import auth from "../auth.service";
import config from "../../config/environment";

var router = express.Router();

router.post("/", function(req, res, next) {
	if (!req.body.refreshToken) {
		return res.status(401).json({message: 'The refresh token is missing.'});
	} else {
		var decoded = jwt.verify(req.body.refreshToken, config.secrets.session);
		var token = auth.signToken(decoded._id, decoded.role);
		var refreshToken = auth.signRefreshToken(decoded._id, decoded.role);
		res.json({ token: token, refreshToken: refreshToken });
	}
});

export default router;
