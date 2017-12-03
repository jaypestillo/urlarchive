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

    URLs: { collection: 'Entries', via: 'owner'}

  },

  // toJSON: function() {
  //   var obj = this.toObject();
  //   delete obj.password;
  //   delete obj.confirmation;
  //   delete obj.encryptedPassword;
  //   delete obj._csrf;
  //   return obj;
  // },

  connection: 'mongodbServer'

};
