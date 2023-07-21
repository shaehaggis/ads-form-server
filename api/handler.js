const nodemailer = require('nodemailer');
require('dotenv').config();


export default function handler(request, response) {

  const mailer = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.GMAIL_ADDRESS,
        pass: process.env.GMAIL_PASSWORD,
    }
  });

  mailer.sendMail(
    {
      from: request.body.userEmail || process.env.CONTACT_ADDRESS,
      to: process.env.CONTACT_ADDRESS,
      subject: "Contact Form Submission",
      html: `
      <h1>New submission on contact form:</h1>
      <br/><br/>
      
      <h2>Name: ${request.body.firstName} ${request.body.surname}</h2>
      <br/>
      
      <h2>Email: ${request.body.userEmail}</h2>
      <br/>
        
      <h2>Message: ${request.body.message}</h2>
      <br/>
      `,
    },

    function (err, info) {
      if (err) return response.status(500).send(err)
      response.status(200).send({"message": "ok"})  
    }
  )  
}