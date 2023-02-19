
var mong=require("../Connection");

const crypto = require("crypto");
const memberschema = new mong.Schema({

    name: String,
    address: String,
    email: String,
    mobile: Number,
    passward: String,
    facebookid:String,
    facebooktoken:String,
    Instagramid:String,
    Instagramtoken:String,
    Posts:[String],
    Brands:[String]

})



const user = mong.model("postageruser", memberschema);
module.exports=user;