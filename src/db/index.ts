import { createConnection } from "typeorm";
import * as config from "../config/ormconfig";

export default createConnection(config);
