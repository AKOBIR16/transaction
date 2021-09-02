const mongoose = require("mongoose")
const mongodb = require("mongodb")
const currency = require("currency")
const initDatabase = require("./init")
const User =  require("./schema/user")
const Journal = require("./schema/journal")


async function transferMoneySession(accountSender,accountReceiver,amount){

    initDatabase();

    const session = await mongoose.startSession()

    session.startTransaction()
    try{
    let sender = await User.findOne({accountNumber:accountSender}).session(session)
    if(!sender){
        throw new Error("Sender not found")
    }
     sender.balance= currency(sender.balance).substract(amount);
     if(sender.balance<0){
         throw new Error(`%{sender.name} has not money enough`)
     }
     await sender.save();

     let debitJournal = new Journal({
         accountNumber:sender.accountNumber,
         operation:"Debit",
         amount:amount
     })
     await debitJournal.save();

     let receiver = await User.findOne({accountNumber:accountReceiver});
     if(!receiver){ throw new Error("receiver not found")}
    receiver.balance =currency(receiver.balance).add(amount)
    let creditJournal = new Journal({
        accountNumber:receiver.accountNumber,
        operation:"Credit",
        amount:amount
    })
    await creditJournal.save();

    await session.commitTransaction()
    console.log("transaction was succesfully");
    } catch(error){
        await session.abortTransaction();
        console.error(error)
        throw  error
    }finally{
        await session.endSession();
    }
}

module.exports = transferMoneySession