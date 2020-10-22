//////////////////////////////////////////////////////////////////////////////
const express = require('express');
const nodemailer = require('nodemailer');
const config = require('../config');
//////////////////////////////////////////////////////////////////////////////
const sendRouter = express.Router();
const jsonParser = express.json();
//////////////////////////////////////////////////////////////////////////////

const transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: config.USER,
        pass: config.PASS
    }
}

const transporter = nodemailer.createTransport(transport)

transporter
    .verify((error, success) => {
        if (error) {
            console.log(error);
        } else {
            console.log('Server is ready to take messages');
        }
    });
    
sendRouter
    .post('/', jsonParser, (req, res, next) => {
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
                })
            }
        })
    })

module.exports = sendRouter;