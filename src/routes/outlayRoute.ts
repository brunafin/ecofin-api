import * as express from "express";
import OutlayController from "../controllers/outlayController";

const outlayRouter = express.Router();

outlayRouter.route("/api/v1/outlays").get(OutlayController.get);
outlayRouter.route("/api/v1/outlays/:id").get(OutlayController.getById);
outlayRouter.route("/api/v1/outlays").post(OutlayController.create);
outlayRouter.route("/api/v1/outlays/:id").put(OutlayController.update);
outlayRouter.route("/api/v1/outlays/:id").delete(OutlayController.delete);

export default outlayRouter;