const mongoose = require("mongoose");
const User = require("./schema/user");

const connstr = "mongodb://localhost:27019/trans"

async function initDatabase(){

    await mongoose.connect(connstr,{
        replicaSet: "rs",
        useNewUrlParser: true,
        useUnifiedTopology:true
    })

     const accountSender = "Ab6771907";
     const accountreceiver = "Ac1234567"

     let user = await User.findOne({accountNumber: accountSender});
    
     if(user == -1){
            user = new User({
                accountNumber:accountSender,
                name: "Ahmad",
                balance : 700000
            })
     }

     let receiver = await User.findOne({accountNumber: accountreceiver})
     if(receiver == -1){
        receiver = new User({
            accountNumber:accountreceiver,
            name: "Anvar",
            balance : 12000
        })
 }
}

module.exports = initDatabase