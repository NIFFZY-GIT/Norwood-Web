import dotenv from "dotenv";
import express from "express";
import cors from "cors";
import nodemailer from "nodemailer";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

// Debug: Check if .env is loading
console.log("SMTP User:", process.env.EMAIL_USER);
console.log("SMTP Pass:", process.env.EMAIL_PASS ? "Exists" : "Not Found");

// Configure Nodemailer for Gmail
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS, // Use your Gmail App Password here
  },
});

app.post("/send", async (req, res) => {
  const { name, email, subject, message } = req.body;

  if (!name || !email || !subject || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: "niffzy@gmail.com", // Change to your recipient email
      subject: `New Contact Form Message: ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`,
    });

    console.log("Email sent:", info.response);
    res.json({ success: true, message: "Message sent successfully!" });
  } catch (error) {
    console.error("Email sending failed:", error);
    res.status(500).json({ success: false, message: "Failed to send message" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
