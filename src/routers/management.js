const express = require("express");
const session = require("express-session");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

const Management = require("../models/management");
const Donate = require("../models/donate");
const Bloodbank = require("../models/bloodbank");

const generateRequestsClean = require("../helpers/generateRequestClean");

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

router.post("/management-signup", async (req, res) => {
  console.log(req.body);
  const memberObj = req.body;
  const member = await Management.findOne({ email: memberObj.email });
  if (member) {
    if (req.session.member) {
      res.render("managementhome", { title: "Management Home" });
    } else {
      res.render("managementregister-email-exists", {
        title: "Management SignUp",
      });
    }
  } else {
    memberObj.createdAt = moment().format();
    const newManagementMember = new Management(memberObj);
    try {
      await newManagementMember.save();
      req.session.member = newManagementMember;
      res.render("managementhome", { title: "Management Home" });
    } catch (e) {
      console.log(e);
      res.render("server-error", { title: "Server Error" });
    }
  }
});

router.get("/management-login-page", (req, res) => {
  res.render("managementlogin", { title: "Management Login" });
});

router.post("/management-login", async (req, res) => {
  try {
    console.log(req.body);
    if (req.session.member) {
      res.render("managementhome", { title: "Management Home" });
    } else {
      const email = req.body.email;
      const password = req.body.password;
      const managementMember = await Management.findOne({ email, password });
      if (managementMember) {
        req.session.member = managementMember;
        res.render("managementhome", { title: "Management Home" });
      } else {
        res.render("managementlogin-wrong-creds", {
          title: "Management Login",
        });
      }
    }
  } catch (e) {
    console.log(e);
    res.render("server-error", { title: "Server Error" });
  }
});

router.get("/management-home-page", (req, res) => {
  if (req.session.member) {
    res.render("managementhome", { title: "Management Home" });
  } else {
    res.render("managementlogin", { title: "Management Login" });
  }
});

router.get("/donor-requests-page", async (req, res) => {
  if (req.session.member) {
    const requests = await Donate.find({});
    const requestsClean = generateRequestsClean(requests);
    res.render("donorrequests", {
      title: "Donor Requests",
      requests: requestsClean,
    });
  } else {
    res.render("managementlogin", { title: "Management Login" });
  }
});

router.post("/accept-request", async (req, res) => {
  try {
    if (req.session.member) {
      console.log(req.body);
      const id = req.body.id;
      const volume = parseInt(req.body.volume, 10);
      const donate = await Donate.findOne({ id });
      if (donate) {
        const bloodGroup = donate.bloodGroup;
        const bloodBankEntry = await Bloodbank.findOne({
          bloodType: bloodGroup,
        });
        console.log(bloodBankEntry);
        bloodBankEntry.volume += volume;
        await bloodBankEntry.save();
        await Donate.deleteOne({ id });
        const requests = await Donate.find({});
        const requestsClean = generateRequestsClean(requests);
        res.render("donorrequests", {
          title: "Donor Requests",
          requests: requestsClean,
        });
      } else {
        throw new Error("Server Error");
      }
    } else {
      res.render("managementlogin", { title: "Management Login" });
    }
  } catch (error) {
    console.log(error);
    res.render("server-error", { title: "Server Error" });
  }
});

router.post("/reject-request", async (req, res) => {
  console.log(req.body);
  const id = req.body.id;
  await Donate.deleteOne({id});
  const requests = await Donate.find({});
  const requestsClean = generateRequestsClean(requests);
  res.render("donorrequests", {
    title: "Donor Requests",
    requests: requestsClean,
  });
  
});

router.get("/bloodstock-page", async (req, res) => {
  try {
    if (req.session.member) {
      const blood = await Bloodbank.find({});
      res.render("bloodstock", { title: "Blood Bank", blood });
    } else {
      res.render("managementlogin", { title: "Management Login" });
    }
  } catch (e) {
    console.log(e);
    res.render("server-error", { title: "Server Error" });
  }
});

router.get("/request-blood-page", (req, res) => {
  if (req.session.member) {
    res.render("requestblood", { title: "Request Blood", message: "" });
  } else {
    res.render("managementlogin", { title: "Management Login" });
  }
});

router.post("/request-blood", async (req, res) => {
  try {
    if (req.session.member) {
      console.log(req.body);
      const bloodType = req.body.bloodGroup;
      const volume = req.body.volume;
      const blood = await Bloodbank.findOne({ bloodType });
      if (blood) {
        blood.volume -= volume;
        await blood.save();
        res.render("requestblood", {
          title: "Request Blood",
          message: "Request accepted.",
        });
      } else {
        throw new Error("Server Error");
      }
    } else {
      res.render("managementlogin", { title: "Management Login" });
    }
  } catch (e) {
    console.log(e);
    res.render("server-error");
  }
});

router.get("/management-logout", (req, res) => {
  if (req.session.member) {
    req.session.member = null;
    res.render("landing_page", { title: "Home" });
  } else {
    res.render("managementlogin", { title: "Management Login" });
  }
});

module.exports = router;
