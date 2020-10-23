const express = require("express");
const session = require("express-session");

const router = new express.Router();

router.use(
  session({
    secret: "bloodbank-app",
    resave: false,
    saveUninitialized: false,
  })
);

router.post("/donate", (req, res) => {
  console.log(req.body);
});

module.exports = router;
