import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import compression from "compression";
import Database from "./src/infra/db";
import uploads from "./src/infra/uploads";
import outlayRouter from "./src/routes/outlayRoute";
import swaggerUi from "swagger-ui-express";
import swaggerJsdoc from "swagger-jsdoc";

class App {
  public app: express.Application;
  private readonly _db: Database;
  private readonly bodyParser;

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

  enableCors(): void {
    const options: cors.CorsOptions = {
      methods: "POST, PUT, PATCH, GET, DELETE",
      origin: "*",
    };

    this.app.use(cors(options));
  }

  middleware(): void {
    this.enableCors();
    this.app.use(bodyParser.json());
    this.app.use(bodyParser.urlencoded({ extended: false }));
    this.app.use(compression());
  }

  routes(): void {
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

  swaggerSetup(): void {
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
