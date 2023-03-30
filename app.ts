import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import Database from "./src/infra/db";
import OutlayController from "./src/controllers/outlayController";
import uploads from "./src/infra/uploads";
import Auth from "./src/infra/auth";

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
  }

  routes() {
    this.app.route("/").get((req, res) => {
      res.send("Versão: 1.0.0 teste");
    });

    this.app.route("/uploads").post(uploads.single("file"), (req, res) => {
      try {
        res.send("Arquivo enviado com sucesso");
      } catch (error) {
        console.log(error);
      }
    });

    // this.app.use(Auth.validade);

    this.app.route("/api/v1/outlays").get(OutlayController.get);
    this.app.route("/api/v1/outlays/:id").get(OutlayController.getById);
    this.app.route("/api/v1/outlays").post(OutlayController.create);
    this.app.route("/api/v1/outlays/:id").put(OutlayController.update);
    this.app.route("/api/v1/outlays/:id").delete(OutlayController.delete);
  }
}

export default new StartUp();
