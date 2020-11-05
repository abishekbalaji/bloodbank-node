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

router.get("/bloodbank", (req, res) => {
  console.log(req.body);
});

module.exports = router;
