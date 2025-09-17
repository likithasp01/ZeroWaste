const express = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const router = express.Router();

const otpStore = {};

const { sendVerificationEmail } = require("../utils/mailer");

router.get("/register", (req, res) => {
  res.render("register", { error: null, otpSent: false, email: null });
});

router.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  try {
    const existingUser = await User.findByEmail(email);
    if (existingUser) {
      return res.render("register", {
        error: "Email already exists",
        otpSent: false,
        email: null,
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    otpStore[email] = { otp, name, hashedPassword, createdAt: Date.now() };

    try {
      await sendVerificationEmail(email, otp);
      console.log(` OTP sent to ${email}: ${otp}`);
    } catch (err) {
      console.error(" Error sending OTP:", err);
      return res.render("register", {
        error: "Failed to send OTP. Try again.",
        otpSent: false,
        email: null,
      });
    }

    res.render("register", { error: null, otpSent: true, email });
  } catch (err) {
    console.error(err);
    res.render("register", {
      error: "Error registering user. Try again.",
      otpSent: false,
      email: null,
    });
  }
});

router.post("/verify-otp", async (req, res) => {
  const { email, otp } = req.body;

  try {
    const record = otpStore[email];
    if (!record) {
      return res.render("register", {
        error: "No OTP request found. Please register again.",
        otpSent: false,
        email: null,
      });
    }

const otpExpiry = (process.env.OTP_EXP_MINUTES || 10) * 60 * 1000;
if (Date.now() - record.createdAt > otpExpiry) {
  delete otpStore[email];
  return res.render("register", {
    error: `OTP expired. Please register again.`,
    otpSent: false,
    email: null,
  });
}

if (otp !== record.otp) {
      return res.render("register", {
        error: "Invalid OTP. Try again.",
        otpSent: true,
        email,
      });
    }

    await User.create(record.name, email, record.hashedPassword);
    delete otpStore[email];

    res.redirect("/login");
  } catch (err) {
    console.error(err);
    res.render("register", {
      error: "OTP verification failed",
      otpSent: true,
      email,
    });
  }
});

router.post("/resend-otp", async (req, res) => {
  const { email } = req.body;

  if (!otpStore[email]) {
    return res.render("register", {
      error: "No registration found. Please register again.",
      otpSent: false,
      email: null,
    });
  }

  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  otpStore[email].otp = otp;
  otpStore[email].createdAt = Date.now();

  try {
    await sendVerificationEmail(email, otp);
    console.log(` Resent OTP to ${email}: ${otp}`);
  } catch (err) {
    console.error(" Error resending OTP:", err);
    return res.render("register", {
      error: "Failed to resend OTP. Try again.",
      otpSent: true,
      email,
    });
  }

  res.render("register", { error: null, otpSent: true, email });
});

router.get("/login", (req, res) => {
  res.render("login", { error: null });
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findByEmail(email);
    if (!user) {
      return res.render("login", { error: "User not found" });
    }

    const isMatch = await bcrypt.compare(password, user.password_hash);
    if (!isMatch) {
      return res.render("login", { error: "Invalid password" });
    }

    req.session.user = { id: user.id, name: user.name, email: user.email };
    res.redirect("/home");
  } catch (err) {
    console.error(err);
    res.render("login", { error: "Error logging in. Try again." });
  }
});

router.get("/logout", (req, res) => {
  req.session.destroy(() => {
    res.redirect("/login");
  });
});

module.exports = router;
