const mongoose = require("mongoose")
 const journal = mongoose.model("Journal", new mongoose.Schema({
     accountnumber: String,
     operation: String,
     amount:Number
 }))



 module.exports = journal