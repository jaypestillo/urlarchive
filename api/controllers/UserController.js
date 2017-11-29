/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	'new': function (req, res) {
		res.view();
	},

	create: function (req, res, next) {
		//Create a user with the params entered in the new.ejs form.
		User.create( req.params.all(), function userCreated (err, user) {
			//if error
			if (err) {
				//console.log(err);  //for testing purposes
				req.session.flash = {
					err: err
				}

				//if error redirect to the signup page.
				return res.redirect('/user/new');
			}

			//After the user is successfully created redirect to the show action.
			res.json(user);
		});
	}

};
