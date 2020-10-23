const express = require("express");
const session = require("express-session");

const Donor = require("../models/donor");

const router = new express.Router();

router.use(
  session({
    secret: "bloodbank-app",
    resave: false,
    saveUninitialized: false,
  })
);

router.get("/donor-registration-page", (req, res) => {
  res.render("donorregister", {
    title: "Donor SignUp",
  });
});

router.post("/donor-signup", async (req, res) => {
  console.log(req.body);
  const donor = await Donor.findOne({ email: req.body.email });
  if (donor) {
    if (req.session.donor) {
      res.render("donorhome", {
        title: "Donor home",
      });
    } else {
      res.render("donorregister-email-exists");
    }
  } else {
    const newDonor = new Donor(req.body);
    try {
      await newDonor.save();
      req.session.donor = newDonor;
      res.render("donorhome", {
        title: "Donor home",
      });
    } catch (e) {
      console.log(e);
      res.render("");
    }
  }
});

router.get("/donor-login-page", (req, res) => {
  res.render("donorlogin", {
    title: "Donor Login",
  });
});

router.post("/donor-login", async (req, res) => {
  console.log(req.body);
  const email = req.body.email;
  const password = req.body.password;
  const donor = await Donor.findOne({ email, password });
  if (donor) {
    req.session.donor = donor;
    res.render("donorhome", {
      title: "Donor Home",
    });
  } else {
    res.render("donorlogin-wrong-creds");
  }
});

router.post("/donate", (req, res) => {
  console.log(req.body);
});

module.exports = router;
