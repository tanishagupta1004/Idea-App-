const express=require('express');
const serverConfig=require('./configs/server.config');
const mongoose=require("mongoose");
const dbConfig=require('./configs/db.config');
const app=express()

/**
 * Logic to connect to MongoDB and create an Admin user
 */
mongoose.connect(dbConfig.DB_URL);
const db=mongoose.connection;

db.on("error",()=>{
    console.log("Eroor while connecting to DB");
});
db.once("open",()=>{
    console.log("DB is connected");
})

app.listen(serverConfig.PORT,()=>{
    console.log(`Server Started on the port number ${serverConfig.PORT}`);
})