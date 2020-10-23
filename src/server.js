const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");

require("./db/mongoose");

const donorRouter = require("./routers/donor");
const bloodbankRouter = require("./routers/bloodbank");
const userRouter = require("./routers/user");

const app = express();

const publicPath = path.join(__dirname, "public");
const viewsPath = path.join(__dirname, "views");

app.set("view engine", "hbs");
app.set("views", viewsPath);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(publicPath));

app.use(express.json());

app.use(donorRouter);
app.use(bloodbankRouter);
app.use(userRouter);

app.listen(3000, () => {
  console.log("Server started on port 3000");
});
