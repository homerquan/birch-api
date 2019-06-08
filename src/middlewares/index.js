import bearerToken from 'express-bearer-token';
import { verifyRefreshToken } from '../auth/auth-service';

// Translate JWT to User (id and role), overwrite variables
const jwtToUser = (req, res, next) => {
  try {
    const decoded = verifyRefreshToken(req.token);
    req.user = decoded;
  } catch (err) {
    console.error('incorrect token');
  }
  next();
};

const middleware = [bearerToken(), jwtToUser];

module.exports = middleware;
