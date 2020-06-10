import dotenv from "dotenv";
import bodyParser from "body-parser";
import cors from "cors";
import morgan from "morgan";
import passport from "passport";
import { Container } from "inversify";
import { bindings } from "./config/inversify";
import { InversifyExpressServer, getRouteInfo } from "inversify-express-utils";
import * as prettyjson from "prettyjson";

// app.use(paginate.middleware(10, 50));

// const dir = path.join(__dirname, "..", "uploads");
// app.use(express.static(dir));

// app.use(ErrorMiddleware.execute);

if (process.env.NODE_ENV !== "testing") {
  (async function () {
    dotenv.config();
    const container = new Container();
    await container.loadAsync(bindings);
    const app = new InversifyExpressServer(container);
    app.setConfig((app) => {
      app.use(passport.initialize());

      app.use(cors());

      app.use(morgan("dev"));
      app.use(bodyParser.urlencoded({ extended: false }));
      app.use(bodyParser.json());

      app.get("/healthz", (req, res) => {
        res.status(200).send("OK");
      });
    });
    const server = app.build();
    const routeInfo = getRouteInfo(container);

    console.log(prettyjson.render({ routes: routeInfo }));
    server.listen(5000, () => {
      console.log("Listening on port " + 5000);
    });
  })();
}
