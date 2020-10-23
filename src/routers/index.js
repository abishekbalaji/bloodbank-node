const express = require("express");

const router = new express.Router();

router.get("/", (req, res) => {
  res.render("landing_page", { title: "Blood Bank Management" });
});

module.exports = router;
