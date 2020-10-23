const express = require("express");
const session = require("express-session");

const router = new express.Router();

router.use(
  session({
    secret: "Your secret key",
    resave: false,
    saveUninitialized: false,
  })
);

router.post("/login", (req, res) => {
  console.log(req.body);
});

router.post("/signup", (req, res) => {
  console.log(req.body);
});

module.exports = router;
