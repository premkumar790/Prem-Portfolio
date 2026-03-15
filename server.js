const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (req, res) => {
  res.send("Server is running!");
});

app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  let transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false,
    service: "gmail",
    auth: {
      user: "prembermo244@gmail.com",
      pass: "louaorfvkiwrdpwe", // App password
    },
  });

  let mailOptions = {
    from: email,
    to: "prembermo244@gmail.com",
    subject: "New Portfolio Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    res.send("Message Sent Successfully");
  } catch (error) {
    console.error(error);
    res.status(500).send("Error sending message");
  }
});

app.listen(5000, () => {
  console.log("Server running on http://localhost:5000");
});