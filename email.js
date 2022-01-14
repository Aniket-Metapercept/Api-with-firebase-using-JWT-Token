const dotenv = require('dotenv').config()
var nodemailer = require('nodemailer');

const sendMail = (userEmail)=> {
    
    
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.MyMail,
            pass: process.env.Password
        }
    });
    
    
    var mailOptions = {
        from: process.env.MyMail,
        to: userEmail, 
        subject: 'Sending Email using Node.js',
        text: 'You registeration was successfull ...!'
    };
    
    
    transporter.sendMail(mailOptions, function(error, info){
        if (error) {
            console.log(error);
        } else {
            console.log('Email sent: ' + info.response); 
        }
    });
}

module.exports = sendMail