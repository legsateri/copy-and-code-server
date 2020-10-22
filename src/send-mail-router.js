//////////////////////////////////////////////////////////////////////////////
const express = require('express');
const creds = require('./config');
const nodemailer = require('nodemailer');
//////////////////////////////////////////////////////////////////////////////
const sendMailRouter = express.Router();
//////////////////////////////////////////////////////////////////////////////

const transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
};

const transporter = nodemailer.createTransport(transport);

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    };
});

sendMailRouter
    .post('/send', (req, res, next) => {
        const name = req.body.name
        const email = req.body.email
        const message = req.body.message
        const content = `name: ${name} \n email: ${email} \n message: ${message} `

        const mail = {
            from: name,
            to: 'hellocopyandcode@gmail.com',
            subject: "Copy & Code, You've Got Mail!",
            text: content
        }

        transporter.sendMail(mail, (err, data) => {
            if (err) {
                res.json({
                    msg: 'fail'
                })
            } else {
                res.json({
                    msg: 'success'
                });
            };
        });
    });