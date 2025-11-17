const mongo = require("mongoose")

let connect = null;
async function connectDB() {
    connect = await mongo.connect("mongodb://localhost:27017/mongo_tp")
    console.log("connected to db")
    return connect;
}

module.exports =  connectDB ;