const express = require("express");
const path = require("path");
const db = require("../firebase");

const router = express.Router();

/* Dashboard */
router.get("/dashboard", (req, res) => {
  if (!req.session.user) return res.redirect("/login");

  res.sendFile(path.join(__dirname, "..", "public", "dashboard.html"));
});

/* Worker Details Page */
router.get("/worker-details", (req, res) => {
  if (!req.session.user || req.session.user.role !== "worker") {
    return res.redirect("/login");
  }

  res.sendFile(path.join(__dirname, "..", "public", "workerDetails.html"));
});

/* Save Worker Professional Details */
router.post("/worker-details", async (req, res) => {
  try {
    const { name, email, profession, experience, location, phone, availability } = req.body;

    // SAVE ONLY INTO workers collection
    await db.collection("workers").doc(email).set({
      name,
      email,
      profession,
      experience,
      location,
      phone,
      availability
    });

    res.redirect("/dashboard");

  } catch (err) {
    console.log(err);
    res.send("Error saving worker details");
  }
});

/* Show Available Workers */
router.get("/available-workers", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "public", "availableWorkers.html"));
});

/* API: Get Available Workers */
router.get("/api/workers", async (req, res) => {
  try {
    const snapshot = await db.collection("workers").get();
    const workers = [];
    snapshot.forEach(doc => workers.push(doc.data()));
    res.json(workers);
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to fetch workers" });
  }
});

module.exports = router;
