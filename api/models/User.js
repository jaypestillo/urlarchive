/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  //The below field gets rid of the _csrf token, the password, and confirmation from user view and database.
  schema: true,

  attributes: {

    email: { type: 'string', required: true, email: true, unique: true},

    encryptedPassword: { type: 'string'},

  },

  // toJSON: function() {
  //   var obj = this.toObject();
  //   delete obj.password;
  //   delete obj.confirmation;
  //   delete obj.encryptedPassword;
  //   delete obj._csrf;
  //   return obj;
  // },
  beforeCreate: function (values, next) {

    // checks to make sure the password and confirmation match before creating record
    if (!values.password || values.password != values.confirmation) {
      return next({err: ["Password doesn't match password confirmation."]});
    }
    require('bcrypt').hash(values.password, 10, function passwordEncrypted(err, encryptedPassword) {
      if (err) return next(err);
      values.encryptedPassword = encryptedPassword;
      // values.online= true;
      next();
    });
  },

  connection: 'mongodbServer'

};
