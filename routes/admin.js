const express = require("express");
const router = express.Router();
const db = require("../db");

router.get("/users", async (req, res) => {
  try {
    const [results] = await db.query("SELECT id, name, email FROM users");
    res.render("admin-users", { users: results });
  } catch (err) {
    console.error("Error fetching users:", err);
    res.status(500).send("Database error");
  }
});

router.post("/delete-user/:id", async (req, res) => {
  const userId = req.params.id;
  try {
    await db.query("DELETE FROM users WHERE id = ?", [userId]);
    res.redirect("/admin/users");
  } catch (err) {
    console.error("Error deleting user:", err);
    res.status(500).send("Error deleting user");
  }
});

module.exports = router;
