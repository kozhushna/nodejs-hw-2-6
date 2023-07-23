const nodemailer = require('nodemailer');
require('dotenv').config();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
  //   service: 'gmail',
  //   host: 'smtp.gmail.com',
  //   port: 587,
  //   secure: false,

  // sendmail: true,
  //   newline: 'unix',
  host: 'smtp.ukr.net',
  port: 465,
  secure: true,
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
});

// const email = {
//   // from: SENDER_EMAIL,
//   to: SENDER_EMAIL,
//   subject: 'Test email',
//   text: 'Test email',
// };

// transport
//   .sendMail(email)
//   .then(() => console.log('Email send success'))
//   .catch((error) => console.log(error.message));

const sendEmail = async (data) => {
  const email = { ...data, from: SENDER_EMAIL };
  await transport.sendMail(email);
  return true;
};

// sendEmail(email);

module.exports = sendEmail;
