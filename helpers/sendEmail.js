const nodemailer = require('nodemailer');
require('dotenv').config();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

console.log(SENDER_EMAIL, SENDER_PASSWORD);

const transport = nodemailer.createTransport({
  //   service: 'gmail',
  //   host: 'smtp.gmail.com',
  //   port: 587,
  //   secure: false,

  // sendmail: true,
  //   newline: 'unix',
  host: 'smtp.meta.ua',
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
  //   tls: {
  //     rejectUnauthorized: false,
  //   },
});

const email = {
  from: SENDER_EMAIL,
  to: 'lktoshev@gmail.com',
  subject: 'Test email',
  text: 'Test email',
};

// transport
//   .sendMail(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message));

const sendEmail = () => {
  transport.sendMail(email);
};

transport.sendMail(email);

module.exports = sendEmail;
