const express = require("express");
const session = require("express-session");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const Donor = require("../models/donor");
const Donate = require("../models/donate");

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
    let donorObj = req.body;
    donorObj.createdAt = parseInt(moment().format("X"), 10);
    console.log(donorObj);
    const newDonor = new Donor(donorObj);
    try {
      await newDonor.save();
      req.session.donor = newDonor;
      res.render("donorhome", {
        title: "Donor home",
      });
    } catch (e) {
      console.log(e);
      res.render("server-error");
    }
  }
});

router.get("/donor-login-page", (req, res) => {
  res.render("donorlogin", {
    title: "Donor Login",
  });
});

router.get("/donor-home", (req, res) => {
  if (req.session.donor) {
    res.render("donorhome", {
      title: "Donor Home",
    });
  } else {
    res.render("donorlogin", {
      title: "Donor Login",
    });
  }
});

router.post("/donor-login", async (req, res) => {
  if (req.session.donor) {
    res.render("donorhome", {
      title: "Donor Home",
    });
  } else {
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
  }
});

router.get("/donate-page", (req, res) => {
  res.render("donate", {
    title: "Donate Blood",
  });
});

router.post("/donate", async (req, res) => {
  console.log(req.body);
  if (req.session.donor) {
    const id = uuidv4();
    let donateObj = req.body;
    donateObj.id = id;
    donateObj.createdAt = parseInt(moment().format("X"), 10);
    if (donateObj.haveDisease === "Yes") {
      donateObj.haveDisease = true;
    } else {
      donateObj.haveDisease = false;
    }
    const newDonate = new Donate(donateObj);
    try {
      await newDonate.save();
      res.render("donorhome", { title: "Donor Home" });
    } catch (e) {
      console.log(e);
      res.render("server-error");
    }
  }
});

router.get("/donor-logout", (req, res) => {
  req.session.donor = null;
  res.render("landing_page", { title: "Home" });
});

module.exports = router;
