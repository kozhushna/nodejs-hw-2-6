const nodemailer = require('nodemailer');
require('dotenv').config();

const { SENDER_EMAIL, SENDER_PASSWORD } = process.env;

const transport = nodemailer.createTransport({
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

const sendEmail = async (data) => {
  const email = { ...data, from: SENDER_EMAIL };
  await transport.sendMail(email);
  return true;
};

module.exports = sendEmail;
