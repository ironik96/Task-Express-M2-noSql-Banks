const { model, Schema } = require('mongoose');

const AccountSchema = new Schema({
  username: String,
  funds: Number,
});

module.exports = model('Account', AccountSchema);
