import dotenv from "dotenv";
import path from "path";
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";

import ormConnection from "./db";

// const paginate = require('express-paginate');
dotenv.config();
const app = express();

import { ErrorMiddleware } from "./app/api/middlewares/error.middleware";
import { AuthController } from "./app/api/controllers/auth.controller";

app.use(passport.initialize());

app.use(cors());

app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// app.use(paginate.middleware(10, 50));

const dir = path.join(__dirname, "..", "uploads");
app.use(express.static(dir));

new AuthController().register(app);
app.use(ErrorMiddleware.execute);

app.get("/healthz", (req, res) => {
  res.status(200).send("OK");
});

if (process.env.NODE_ENV !== "testing") {
  (async function () {
    try {
      await ormConnection();
      app.listen(5000, () => {
        console.log("Listening on port " + 5000);
      });
    } catch (e) {
      console.error(e);
    }
  })();
}

module.exports = app;
