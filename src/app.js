//////////////////////////////////////////////////////////////////////////////
const express = require('express');
const cors = require('cors');
//////////////////////////////////////////////////////////////////////////////
const sendMailRouter = require('./send-mail-router');
//////////////////////////////////////////////////////////////////////////////
const app = express();
//////////////////////////////////////////////////////////////////////////////
app.use(cors());
//////////////////////////////////////////////////////////////////////////////
app.use('/send', sendMailRouter);
//////////////////////////////////////////////////////////////////////////////

app.get('/', (req, res) => {
    res.json({ ok: true });
});

module.exports = app;