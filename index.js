const express = require("express");
const app = express();
const dotenv = require("dotenv");
const connectDb = require("./config/db");
const userRoutes = require("./Routes/userRoutes");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const cookieAuthToken = require("./Middleware/cookieAuth");
// const { default: AboutUser } = require("../FRONTEND/src/components/aboutUser");
app.use(cookieParser());
// app.use(cors());
app.use(cors({ credentials: true, origin: 'http://localhost:5173' }));

dotenv.config();
app.use(express.json());
connectDb();



app.use("/api/user",userRoutes);

app.get("/userInfo",cookieAuthToken,(req,res)=>{
    if(req.user){
    res.status(201);
    res.send(req.user);
    console.log("user authrized");
    console.log(req.user);
}
    else{
        res.status(401);
        console.log("user not authrized");
    }
})


app.listen(3000,(req,res)=>{
    console.log("port is running");
})