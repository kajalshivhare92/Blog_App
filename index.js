const express = require('express')
const mainRouter = require('./routes/mainRoutes')
require("dotenv").config();
const { transporter, mailOptions } = require('./services/email Service')
require("./config/modelConfig")
const cron = require("node-cron")

const PORT = process.env.PORT || 5000;
const HOST = "localhost";
const app = express()
const port = 9000

//  creating a cron job which run every 10 second

// cron.schedule("*/3 * * * * *", function(){
//   transporter.sendMail(mailOptions, (error, info) => {
//     if (error) {
//       console.log(error);
//     } else {
//       console.log('Email Sent Successfully' + info.response);
//     }
//   })
// })

app.get('/send', async (req, res) => {
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.log(error);
    } else {
      console.log('Email sent successfully' + info.response);
    }
  })
})


app.use(express.json());
app.use('/', mainRouter)

app.listen(PORT, (req, res) => {
  console.log(`Server is running on port: http://${HOST} ${PORT}`)
})
