'use strict';

import Ver from './verification.model';

const verify = function(req, res, next) {
  var token = req.query.token;
  var condition = {
    token: token,
    used: false
  };
 
  Ver.findOneAsync(condition).then(function(ver) {
    if (!ver) {
      return res.status(401).send('error');
    }
    res.json(ver);
  }).catch(function(err) {
    return next(err);
  });
};

export default {verify}