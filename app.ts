import * as express from "express";
import * as bodyParser from "body-parser";
import * as cors from "cors";
import * as compression from "compression";
import Database from "./src/infra/db";
import uploads from "./src/infra/uploads";
import Auth from "./src/infra/auth";
import outlayRouter from "./src/routes/outlayRoute";
import * as swaggerUi from "swagger-ui-express";
import * as swaggerJsdoc from "swagger-jsdoc";

class App {
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
    this.swaggerSetup(); // chame o método que configura o Swagger
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

  swaggerSetup() {
    const options = {
      definition: {
        openapi: "3.0.0",
        info: {
          title: "API Ecofin",
          version: "1.0.0",
          description: "API Ecofin com Swagger",
        },
        servers: [
          {
            url: "http://localhost:3000",
            description: "Servidor Local",
          },
        ],
      },
      apis: ["./src/routes/*.ts"],
    };

    const swaggerSpec = swaggerJsdoc(options);
    this.app.use("/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  }
}

export default new App();
