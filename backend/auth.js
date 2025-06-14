// routes/auth.js
const express = require('express');
const router = express.Router();
const User = require('../models/User');
const nodemailer = require('nodemailer');
const { v4: uuidv4 } = require('uuid');

// Email Transporter Setup
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,     // your email
    pass: process.env.EMAIL_PASS      // your app password
  }
});

router.post('/register', async (req, res) => {
  const { email } = req.body;

  const token = uuidv4();
  const user = new User({ email, verificationToken: token });

  await user.save();

  // Send Email
  const verificationUrl = `http://localhost:3000/verify?token=${token}`;
  await transporter.sendMail({
    from: `"Verify Your Email" <${process.env.EMAIL_USER}>`,
    to: email,
    subject: 'Email Verification',
    html: `<p>Click <a href="${verificationUrl}">here</a> to verify your email.</p>`
  });

  res.status(200).send('Verification email sent.');
});