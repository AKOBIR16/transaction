const mongoose = require('mongoose')

const userSchema = mongoose.model("User",new mongoose.Schema({
    accountNumber: String,
    name: String,
    balance: Number
      
}))

module.exports = userSchema