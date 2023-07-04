const User = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const authToken = require("../config/authToken")

const registerUser = async(req,res)=>{
    const{name,email,password,mobile} = req.body;
    if(!name||!email||!password||!mobile){
        res.status(400);
        throw new Error("please enter all the fields");
    }

    const userExists = await User.findOne({email});
    if(userExists){
        res.status(400);
        throw new Error("user already exist");
    }

    const user = await User.create({
        name,
        email,
        password,
        mobile,
    })
    if(user){
        res.status(201).json({
            id:user._id,
            name:user.name,
            email:user.email,
            mobile:user.mobile,
        

        });
    }
    else{
        res.status(400);
        throw new Error("fail to create the user");
    }

}
const authUser = async(req,res)=>{
    const{email,password} = req.body.data;
   //  console.log(email);
    const user = await User.findOne({email});
      
    if(user &&(await user.matchPassword(password))){
        let token = await authToken(user._id);
        //    console.log(token);
        //    res.cookie("GYM_TOKEN",token,{
        //     maxAge: 7 * 24 * 60 * 60 * 1000, // Cookie expiration time in milliseconds
        //     httpOnly: true, // Ensures the cookie is only accessible via HTTP(S) requests, not client-side JavaScript
        //     secure: true, // Set this to true if using HTTPS
        //     sameSite: 'strict' // Restricts the cookie to be sent only in same-site requests
        //    });
       //if user is found
       res.status(201).json({
           _id:user._id,
           name:user.name,
           email:user.email,
           mobile:user.mobile,
        //    pic:user.pic,
           token: token,

       })
   
    }else{
       res.status(401);
       throw new Error("invalid email or password");
    }
}


// const cookieAuthToken = async(req,res,next)=>{
//    const token = req.cookies.GYM_TOKEN;
//    try {
//     const user = jwt.verify(token,process.env.JWT_SECRET);
//     // console.log(user);
//     req.user=user;
//     next();

//    } catch (error) {
//     res.clearCookie('token');
//    }
// }



module.exports = {registerUser,authUser};