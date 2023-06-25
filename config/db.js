const mongoose = require("mongoose");


const connectDb = async()=>{
    try{
        const conn = await mongoose.connect("mongodb+srv://sudipchanda:iloveyoudeep2002@cluster0.urgxwyj.mongodb.net/gymDb",{
        useNewUrlParser:true,
       });
       console.log(`mongo coonected: ${conn.connection.host}`);
    }
    catch(err){
        console.log(err);
    }
}

module.exports = connectDb