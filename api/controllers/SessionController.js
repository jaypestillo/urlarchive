/**
 * SessionController
 *
 * @description :: Server-side logic for managing sessions
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
//Require the bcrypt module
var bcrypt = require('bcrypt');


module.exports = {

	'signin': function (req, res) {
		res.view('signin');
	},

	create: function (req, res, next) {
		//Try to find the user by there email address.
		User.findOneByEmail(req.param('email'), function foundUser(err, user) {
			if (err) return next(err);
			//no user error
			if (!user) {
				var noAccountError = [{
					name: 'No Account',
					message: 'The email address ' + req.param('email') + ' not found.'
				}]
				//uses the flash.js file
				req.session.flash = {
					err: noAccountError
				}
				res.redirect('/session/signin');
				return;
			}
			//Compare password from the form params to the encrypted password of the user found.
			bcrypt.compare(req.param('password'), user.encryptedPassword, function(err, valid) {
				if (err) return next(err);
				//form password doesn't match database password error
				if (!valid) {
					var usernamePasswordMismatchError = [{
						name: 'Mismatch Credentials',
						message: 'Invalid username and password combination.'
					}]
					//uses the flash.js file
					req.session.flash = {
						err: usernamePasswordMismatchError
					}
					res.redirect('/session/signin');
					return;
				}
				// Log user in
				req.session.authenticated = true;
				req.session.User = user;

				//Redirect to their profile page
				res.redirect('/entries/list/' + user.id);
			});
		});

	},

	destroy: function (req, res, next) {
		//wipe session
		req.session.destroy();
		//redirect to the signin.ejs page
		res.redirect('/');
	}

};
