
//Translate JWT to User (id and role), overwrite variables
const jwtToUser = (req, res, next) => {
  //console.log(req.body);
  next();
};

var middleware = [jwtToUser];

module.exports = middleware;
