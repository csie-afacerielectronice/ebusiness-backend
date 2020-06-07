import { createConnection, Connection } from "typeorm";
import * as config from "../config/ormconfig";

export default (): Promise<Connection> => createConnection(config);
