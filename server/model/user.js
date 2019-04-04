const mongoose = require('mongoose')
const Schema = mongoose.Schema

const userSchema = new Schema ({
  email: String,
  name: String,
  password: String
})

let User = mongoose.model('User', userSchema);

module.exports = User