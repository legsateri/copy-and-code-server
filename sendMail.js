//////////////////////////////////////////////////////////////////////////////
var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
const creds = require('./config');
var cors = require('cors');
//////////////////////////////////////////////////////////////////////////////
const app = express()
//////////////////////////////////////////////////////////////////////////////
app.use(cors())
app.use(express.json())
app.use('/', router)
//////////////////////////////////////////////////////////////////////////////

const PORT = process.env.PORT || 8000

app.listen(PORT, () => {
    console.log(`Server listening at http://localhost:${PORT}`)
})

app.get("/", (req, res) => {
    res.json({ ok: true });
});

var transport = {
    host: 'smtp.gmail.com',
    auth: {
        user: creds.USER,
        pass: creds.PASS
    }
}

var transporter = nodemailer.createTransport(transport)

transporter.verify((error, success) => {
    if (error) {
        console.log(error);
    } else {
        console.log('Server is ready to take messages');
    }
});

router.post('/send', (req, res, next) => {
    var name = req.body.name
    var email = req.body.email
    var message = req.body.message
    var content = `name: ${name} \n email: ${email} \n message: ${message} `

    var mail = {
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