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
    memberObj.createdAt = parseInt(moment().format("X"), 10);
    const newManagementMember = new Management(memberObj);
    try {
      await newManagementMember.save();
      req.session.member = newManagementMember;
      res.render("managementhome", { title: "Management Home" });
    } catch (e) {
      console.log(e);
      res.render("server-error");
    }
  }
});

module.exports = router;