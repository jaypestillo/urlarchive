/**
 * sessionAuth
 *
 * @module      :: Policy
 * @description :: Simple policy to allow any authenticated user
 *                 Assumes that your login action in one of your controllers sets `req.session.authenticated = true;`
 * @docs        :: http://sailsjs.org/#!/documentation/concepts/Policies
 *
 */
module.exports = function(req, res, ok) {
  // User is allowed, proceed to the next policy,
  // or if this is the last policy, the controller
  if (req.session.authenticated) {
    return ok();
  }
  // User is not allowed
  // (default res.forbidden() behavior can be overridden in `config/403.js`)
  else {
    var requireLoginError = [{name: 'Require Login', message: 'You must be signed in.'}]
    req.session.flash = {
      err: requireLoginError
    }
    res.redirect('/session/signin');
    return;
  }

};
