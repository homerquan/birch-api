/*
* @Author: homer
* @Date:   2019-05-17 10:59:40
* @Last Modified by:   homer
* @Last Modified time: 2019-05-17 11:00:19
*/

import expressJwt from 'express-jwt';
import compose from 'composable-middleware';

const validateJwt = expressJwt({
  secret: config.secrets.session,
});

/**
 * Attaches the user object to the request if authenticated
 * Otherwise returns 403
 */
function isAuthenticated() {
  return (
    compose()
      // Validate jwt
      .use(function(req, res, next) {
        // allow access_token to be passed through query parameter as well
        if (req.query && req.query.hasOwnProperty('access_token')) {
          req.headers.authorization = `Bearer ${req.query.access_token}`;
        }
        validateJwt(req, res, next);
      })
      // Attach user to request
      .use(function(req, res, next) {
        User.findByIdAsync(req.user._id)
          .then(function(user) {
            if (!user) {
              return res.status(401).end();
            }
            req.user = user;
            // set owner in middleware
            if (req.body && user._id) {
              req.body._owner = user._id;
            }
            next();
          })
          .catch(function(err) {
            return next(err);
          });
      })
  );
}

/**
 * Checks if the user role meets the minimum requirements of the route
 */
function hasRole(roleRequired) {
  if (!roleRequired) {
    throw new Error('Required role needs to be set');
  }

  return compose()
    .use(isAuthenticated())
    .use(function meetsRequirements(req, res, next) {
      if (config.userRoles.indexOf(req.user.role) >= config.userRoles.indexOf(roleRequired)) {
        next();
      } else {
        res.status(403).send('Forbidden');
      }
    });
}