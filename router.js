const express = require('express');
const router = new express.Router();

const nodemailer = require("nodemailer");



router.post("/contact", (req,res) => {
    
    const name = req.body.name;
    const email = req.body.email;
    const message = req.body.message;




    try {
        

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth:{
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            }
        });

        const mailOptions = {
            from: email,
            to: process.env.EMAIL,
            subject: "Contact Form Submission ",
            html: `<img src="https://preview.redd.it/90ekftm1ltgy.gif?format=png8&s=945a0b51ac574ec956d90594a57d33d254e0b4c3" width="100%"  />
                    <h2 style="text-align:center;" >Name: ${name}</h2>
                    <h3>Email: ${email}</h3>
                    <p>Message: ${message} </p> `,
        };

        transporter.sendMail(mailOptions,(error) => {
            if (error) {
                
                res.json(error);
                
            } else {
                
                res.status(200).json({ code: 200, status: "Message Sent" });
            }
        })


    } catch (error) {
        res.status(400).json({status:400,error})
    }




    
})



module.exports = router;
