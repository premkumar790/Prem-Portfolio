// const express = require("express");
// const nodemailer = require("nodemailer");
// const cors = require("cors");

// const app = express();

// app.use(cors({
//         origin: "https://premkumar790.github.io" // yahan tumhare live portfolio ka URL

// }));
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));

// app.get("/", (req, res) => {
//   res.send("Server is running!");
// });

// app.post("/send", async (req, res) => {
//   const { name, email, message } = req.body;

//   let transporter = nodemailer.createTransport({
//     host: "smtp.gmail.com",
//     port: 587,
//     secure: false,
//     service: "gmail",
//     auth: {
//       user: "prembermo244@gmail.com",
//       pass: "louaorfvkiwrdpwe", // App password
//     },
//   });

//   let mailOptions = {
//     from: email,
//     to: "prembermo244@gmail.com",
//     subject: "New Portfolio Message",
//     text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
//   };

//   try {
//     await transporter.sendMail(mailOptions);
//     res.send("Message Sent Successfully");
//   } catch (error) {
//     console.error(error);
//     res.status(500).send("Error sending message");
//   }
// });

// app.listen(5000, () => {
//   console.log("Server running on http://localhost:5000");
// });


fetch("https://prem-portfolio-rkl5.onrender.com/send", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
        name: nameValue,
        email: emailValue,
        message: messageValue
    })
})
.then(res => res.json())
.then(data => {
    console.log(data);
    alert("Message Sent Successfully!");
})
.catch(err => {
    console.error(err);
    alert("Error sending message!");
});
require("dotenv").config();
const express = require("express");
const nodemailer = require("nodemailer");
const cors = require("cors");

const app = express();

app.use(cors({
        origin: "https://premkumar790.github.io" // yahan tumhare live portfolio ka URL

})); // production me origin restrict kar sakte ho
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
    from: `"Portfolio Contact" <${process.env.EMAIL_USER}>`, // safe sender
    replyTo: email, // visitor email
    to: process.env.EMAIL_USER, // tumhara inbox
    subject: "New Portfolio Message",
    text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
  };

  try {
    let info = await transporter.sendMail(mailOptions);
    console.log("Message sent: %s", info.messageId);
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