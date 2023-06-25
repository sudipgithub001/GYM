const Razorpay = require("razorpay");
const crypto = require("crypto");


const orders =(req,res)=>{
let instance = new Razorpay( {key_id:process.env.KEY_id , key_secret: process.env.KEY_secret} );

var options = {
  amount: req.body.amount*100,  // amount in the smallest currency unit
  currency: "INR",
//   receipt: "order_rcptid_11"
};
instance.orders.create(options, function(err, order) {
    if(err)
    return res.send({message:`server err`});
    return res.send({message:`order created`, data:order }); // returning the order
//   console.log(order);
});
}


const verify =(req,res)=>{
  let body = req.body.response.razorpay_order_id+"|"+req.body.response.razorpay_payment_id;

  let expectedSignature = crypto.createHmac("sha256",process.env.KEY_secret)
  .update(body.toString())
  .digest("hex");

  if(expectedSignature === req.body.response.razorpay_signature){
    res.send({message:"sign valid"});
  }else{
    res.send({message: "sign invalid"});
  }
}

module.exports ={orders,verify};