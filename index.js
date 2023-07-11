const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieAuthToken = require("./Middleware/cookieAuth");
const jwt=require('jsonwebtoken');
const User = require("./Models/userModel")

// const { default: AboutUser } = require("../FRONTEND/src/components/aboutUser");
app.use(cookieParser());
// app.use(cors());
app.use(cors({ credentials: true, origin: 'https://excellencefitness.netlify.app' }));
// app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

dotenv.config();
app.use(express.json());
connectDb();



app.use("/api/user",userRoutes);

// app.get("/userInfo",cookieAuthToken,(req,res)=>{
//     if(req.user){
//     res.status(201);
//     res.send(req.user);
//     console.log("user authrized");
//     console.log(req.user);
// }
app.post("/userInfo", async (req,res)=>{
       const {token} = req.body.data; 
    //    console.log(token);
       const verifyToken=jwt.verify(token,"sudip");
    // console.log(verifyToken);
    const rootUser=await User.findOne({_id:verifyToken.id})
    console.log(rootUser)
    if(rootUser){
        res.status(201);
        res.send(rootUser);
    }
    else{
        res.status(401);
        alert("User not authorized");
    }
    
    
});
  

app.get("/logout",cookieAuthToken, async(req,res)=>{
    try{
        // res.send(req.user);
        res.clearCookie('token');
        // console.log("logout succesful");
        res.status(201).send("logout");
        // res.render("api/user/login");
    }catch(error){
            res.status(500).send(error);
    }
});

const PORT = process.env.PORT || 3000

app.listen(PORT,(req,res)=>{
    console.log("port is running");
})