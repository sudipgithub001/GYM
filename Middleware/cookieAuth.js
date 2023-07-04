const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../Models/userModel");


const cookieAuthToken = async(req,res,next)=>{
   const token = req.cookies.GYM_TOKEN;
   // console.log(token);
   try {
    const user = jwt.verify(token,process.env.JWT_SECRET);
   //  console.log(user);
    req.user= await User.findOne({_id:user.id}) ;
    next();
   } catch (error) {
    res.clearCookie('token');
    console.log("br");
   }
}

module.exports = cookieAuthToken;