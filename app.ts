import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import Database from "./src/infra/db";
import uploads from "./src/infra/uploads";
import Auth from "./src/infra/auth";
import outlayRouter from "./src/routes/outlayRoute";

class StartUp {
  public app: express.Application;
  private _db: Database;
  private bodyParser;

  /**
   *
   */
  constructor() {
    this.app = express();
    this._db = new Database();
    this._db.createConnection();
    this.middleware();
    this.routes();
  }

  enableCors() {
    const options: cors.CorsOptions = {
      methods: "POST, PUT, PATCH, GET, DELETE",
      origin: "*",
    };

    this.app.use(cors(options));
  }

  middleware() {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  routes() {
    this.app.route("/").get((req, res) => {
      res.send("Versão: 1.0.0");
    });

    this.app.route("/uploads").post(uploads.single("file"), (req, res) => {
      try {
        res.send("Arquivo enviado com sucesso");
      } catch (error) {
        console.log(error);
      }
    });

    // this.app.use(Auth.validade);
    this.app.use("/", outlayRouter);

  }
}

export default new StartUp();
