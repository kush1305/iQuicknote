const mongoose = require('mongoose');

//adding url for mongodb connection
const mongoURI = "mongodb://0.0.0.0:27017/inotebook"

//function to connect with your database
async function connectToMongo() {
    mongoose.connect(mongoURI).then(()=>console.log("Connected")).catch((e)=>console.log(e.message))
  }
  
  module.exports = connectToMongo;