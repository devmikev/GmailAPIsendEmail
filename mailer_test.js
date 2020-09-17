require("dotenv").config();
const nodemailer = require("nodemailer");

let transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.USER,
    pass: process.env.PASSWORD,
  },
});

console.log(process.env.EMAIL_USER);
console.log(process.env.PASSWORD);

let mailOptions = {
  from: "dummy.devmv@gmail.com",
  to: "dev.mikev@gmail.com",
  subject: "Testing Gmail API Send",
  text: "This is a TEST!!!",
};

transporter.sendMail(mailOptions, (err, data) => {
  if (err) {
    console.log("Error occured", err);
  } else {
    console.log("Sent email");
  }
});
