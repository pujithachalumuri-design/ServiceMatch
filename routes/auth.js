const express = require("express");
const path = require("path");
const bcrypt = require("bcrypt");
const db = require("../firebase");

const router = express.Router();

/* Signup Page */
router.get("/signup", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "signup.html"));
});

/* Login Page */
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "login.html"));
});

/* Signup Logic */
router.post("/signup", async (req, res) => {
  try {
    const { name, email, password, role } = req.body;

    // Check if email already exists
    const existing = await db.collection("users")
      .where("email", "==", email)
      .get();

    if (!existing.empty) {
      return res.send("Email already registered");
    }

    const hash = await bcrypt.hash(password, 10);

    // Store ONLY basic info in users collection
    await db.collection("users").add({
      name,
      email,
      password: hash,
      role
    });

    req.session.user = {
      name,
      email,
      role
    };

    if (role === "worker") {
      return res.redirect("/worker-details");
    }

    res.redirect("/dashboard");

  } catch (err) {
    console.log(err);
    res.send("Error during signup");
  }
});

/* Login */
router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const snapshot = await db.collection("users")
      .where("email", "==", email)
      .get();

    if (snapshot.empty) return res.send("Invalid login");

    let userDoc;
    snapshot.forEach(doc => userDoc = doc.data());

    const match = await bcrypt.compare(password, userDoc.password);
    if (!match) return res.send("Wrong password");

    req.session.user = {
      name: userDoc.name,
      email: userDoc.email,
      role: userDoc.role
    };

    res.redirect("/dashboard");

  } catch (err) {
    console.log(err);
    res.send("Login error");
  }
});

/* Logout */
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.redirect("/");
});

/* API: Get current user info */
router.get("/api/user", (req, res) => {
  res.json(req.session.user || null);
});

module.exports = router;
