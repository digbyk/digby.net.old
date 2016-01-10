
module.exports = function user(req, res, next) {
  if (req.user) {
    res.locals.user = req.user;
  }
  res.test = 'test';
  next();
}