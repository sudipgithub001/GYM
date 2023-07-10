const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/generateToken");
const authToken = require("../config/authToken");



const userSchema = mongoose.Schema({
    name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
    },
    password:{
        type:String,
        required:true,
    },
    mobile:{
        type:Number,
        required:true,
    },
    pic:{
        type: String , 
        default:"no pic"
    },
    token:
        {
            type:String,
            default:undefined
        }
      
    
},
{timestamps: true}

);



userSchema.pre("save",async function(next){
    if(!this.isModified){
        next();
    }
    // const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password,10);
})

userSchema.methods.matchPassword = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword,this.password);
}

// userSchema.methods.generateAuthToken = async function(){
//     // try {
//     //     // let userToken = jwt.sign({_id:this._id},hello,{
//     //     //     expiresIn:"30d",
//     //     // });
//     //     let userToken = generateToken(this._id);
//     //     console.log(userToken);
//     //     this.tokens = this.tokens.concat({token:userToken});
//     //     await this.save();
//     //     return userToken;
//     // } catch (error) {
//     //    console.log(error); 
//     // }
//     try{
//         // let userToken = jwt.sign({_id:this._id},process.env.JWT_SECRET);
//         // let userToken = authToken(this._id);
//         // this.tokens = this.tokens.concat({token:userToken});
//         // await this.save();
//         // return userToken;
//     }
//     catch(error){
//         console.log(error);
//     }
// }

const User = mongoose.model("User",userSchema);

module.exports = User;