const jwt=require('jsonwebtoken');
const authToken=(id)=>{
    // return jwt.sign({id},process.env.JWT_SECRET,{
    return jwt.sign({id},"sudip",{
        expiresIn:"30d",
    })
};
module.exports=authToken;