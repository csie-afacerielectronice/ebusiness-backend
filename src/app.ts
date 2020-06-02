import dotenv from "dotenv";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

// const paginate = require('express-paginate');
dotenv.config();
const app = express();

require("./models");
import passport from "./config/passport";

app.use(passport.initialize());

app.use(cors());

app.use(require("morgan")("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(paginate.middleware(10, 50));

app.use(require("./routes/product.routes"));
app.use(require("./routes/auth.routes"));
app.use(require("./routes/review.routes"));
app.use(require("./routes/address.routes"));
app.use(require("./routes/category.routes"));
app.use(require("./routes/order.routes"));
app.use(require("./routes/image.routes"));
app.use(require("./middlewares/error.middleware"));

const dir = path.join(__dirname, "..", "uploads");
app.use(express.static(dir));

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

if (process.env.NODE_ENV !== "TEST") {
  const { adminBro, router } = require("./config/admin_bro");
  app.use(adminBro.options.rootPath, router);
  const server = app.listen(5000, () => {
    console.log("Listening on port " + server.address().port);
  });
}

module.exports = app;
