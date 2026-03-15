require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

// CORS for both GitHub Pages + Localhost
app.use(cors({
    origin: [
        "https://premkumar790.github.io",
        "http://127.0.0.1:5500",
        "http://localhost:5500"
    ]
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Test route
app.get("/", (req, res) => {
  res.send("Server is running!");
});

// Send email route
app.post("/send", async (req, res) => {
  const { name, email, message } = req.body;

  if(!name || !email || !message){
      return res.status(400).json({ success: false, message: "All fields are required" });
  }

  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  let mailOptions = {
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    replyTo: email,
    to: process.env.EMAIL_USER,
    subject: "New Portfolio Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent:", info.messageId);
    res.json({ success: true, message: "Message Sent Successfully" });
  } catch (error) {
    console.error("Error sending email:", error);
    res.status(500).json({ success: false, message: "Error sending message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});