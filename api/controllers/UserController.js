/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'signup': function (req, res) {
		res.view('signup');
	},

	create: function (req, res, next) {
		//Create a user with the params entered in the signup.ejs form.
		User.create( req.params.all(), function userCreated (err, user) {
			//if error
			if (err) {
				req.session.flash = {
					err: err
				}
				//if error redirect to the signup page.
				return res.redirect('/user/signup');
			}
			//log the user in
			req.session.authenticated = true;
			req.session.User = user;
			//After the user is successfully created redirect to the list
			res.redirect('/entries/list/'+user.id);
		});
	}

	// list: function (req, res, next) {
	// 	User.findOne(req.param('id'), function foundUser (err, user) {
	// 		if (err) return next(err);
	// 		if (!user) return next();
  //
	// 		res.view({ user: user });
	// 	});
	// }

};
