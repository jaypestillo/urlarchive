/**
 * EntriesController
 *
 * @description :: Server-side logic for managing entries
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	//List function for Entries
	list: function(req, res) {
		Entries.find({}).exec(function(err, entries) {
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			res.view('list', {entries: entries});
		});
	},

	//Add function for Entries
	add: function(req, res){
		res.view('add');
	},
	create: function(req, res) {
		var title = req.body.title;
		var category = req.body.category;
		var date = req.body.date;
		var url = req.body.url;
		var owner = req.body.owner;

		Entries.create({title: title, category: category, date: date, url: url, owner:owner}).exec(function(err) {
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			res.redirect('/entries/list');
		});
	},


	//Delete function for Entries
	delete: function(req, res) {
		Entries.destroy({id:req.params.id}).exec(function(err) {
			if (err) {
				res.send(500, {error: 'Database Errror'});
			}
			res.redirect('/entries/list');
		});
		return false;
	},


	//Edit function for entries
	edit: function(req, res) {
		Entries.findOne({id:req.params.id}).exec(function(err, entry) {
			if (err) {
				res.send(500, {error: 'Database Error'});
			}
			res.view('edit', {entry: entry});
		});
	},
	update: function(req, res) {
			var title = req.body.title;
			var category = req.body.category;
			var date = req.body.date;
			var url = req.body.url;

			Entries.update({id:req.params.id},{title: title, category: category, date: date, url: url}).exec(function(err) {
				if (err) {
					res.send(500, {error: 'Database Error'});
				}
				res.redirect('/entries/list');
			});
			return false;
	}

};
