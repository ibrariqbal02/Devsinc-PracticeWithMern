const nodemailer = require("nodemailer");
    
const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true, // use SSL
    auth: {
        user: 'todoapps.info@gmail.com',
        pass: "gmisldluaadrfsyr",
    }
});

module.exports = { transporter };