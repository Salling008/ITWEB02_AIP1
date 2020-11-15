function loggedOut(req, res, next) {
  if (req.session && req.session.userId) {
    return res.redirect("/workout");
  }
  return next();
}

module.exports.loggedOut = loggedOut;
