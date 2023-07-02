const express=require('express');
const serverConfig=require('./configs/server.config');
const mongoose=require("mongoose");
const dbConfig=require('./configs/db.config');
const app=express()
const userModel = require('./models/user.model');
const bcrypt=require('bcrypt');
/**
 * Logic to connect to MongoDB and create an Admin user
 */
mongoose.connect(dbConfig.DB_URL);
const db=mongoose.connection;

db.on("error",()=>{
    console.log("Error while connecting to DB");
});
db.once("open",()=>{
    console.log("DB is connected");

    init();
})

async function  init(){
    /*
    *check if the admin user is already present
    
    */
   let admin=await userModel.findOne({
    userId:"admin"
   })
   if(admin){
    console.log("Admin is already present");
    return;
   }

   admin=await userModel.create({
    name:"Tanisha Gupta",
    userId:"admin",
    email:"tanishagupta382@gmail.com",
    userType:"ADMIN",
    password:bcrypt.hashSync("Welcome1",8)
   });
   console.log(admin);
   
}

app.listen(serverConfig.PORT,()=>{
    console.log(`Server Started on the port number ${serverConfig.PORT}`);
})