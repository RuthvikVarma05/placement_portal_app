const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  email: String,
  password: String
}, {
  collection: 'listofusers' // this forces MongoDB to use that collection name
});

module.exports = mongoose.model('User', userSchema);
