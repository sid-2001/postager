const nodemailer = require("nodemailer")
var randomize = require('randomatic');
const transport =nodemailer.createTransport({
    service:"gmail",
    host: "smtp.gmail.com",
    port: 465,
    auth: {
        user: process.env.Email,
        pass: process.env.Email_Passward
    }
})
const Transporter=async(email,localStorage)=>{

var randomnumber=randomize('0',6);

localStorage.setItem(JSON.stringify(email), randomnumber); 
  return await  transport.sendMail({
            		from: process.env.Email,
            		to: email,
            		subject: "Passward Change",
            		html: `<div className="email" style="
                    border: 1px solid black;
                    padding: 20px;
                    font-family: sans-serif;
                    line-height: 2;
                    font-size: 20px; 
                    ">
                    <h2>Here is your code</h2>
            		<h3>${randomnumber}</h3>
                    <br>
            	    <span>Siddhant Kaushik<br>AllSafe<span>
                     </div>
                `
            	})
                
            
            
}
        
            

module.exports=Transporter;