const express = require("express");
const session = require("express-session");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const Management = require("../models/management");

const router = new express.Router();

router.use(
  session({
    secret: "bloodbank-app",
    resave: false,
    saveUninitialized: false,
  })
);

router.get("/management-registration-page", (req, res) => {
  res.render("managementregister", { title: "Management SignUp" });
});

module.exports = router;
