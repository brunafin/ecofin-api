import OutlayService from "../services/outlayService";
import * as HttpStatus from "http-status";
import Helper from "../infra/helper";

class OutlayController {
  get(req, res) {
    OutlayService.get()
      .then((outlays) => Helper.sendReponse(res, HttpStatus.OK, outlays))
      .catch((error) => console.error.bind(console, `Error ${error}`));
  }

  async getById(req, res) {
    try {
      const __id = req.params.id;
      const result = await OutlayService.getById(__id);
      Helper.sendReponse(res, HttpStatus.OK, result);
    } catch (error) {
      console.error(error);
    }
  }

  async create(req, res) {
    try {
      const outlay = req.body;
      OutlayService.create(outlay);
      Helper.sendReponse(
        res,
        HttpStatus.CREATED,
        "Compra cadastrada com sucesso"
      );
    } catch (error) {
      console.error(error);
    }
  }

  async update(req, res) {
    try {
      const _id = req.params.id;
      const outlayBody = req.body;
      OutlayService.update(_id, outlayBody);
      Helper.sendReponse(
        res,
        HttpStatus.NO_CONTENT,
        "Compra atualizada com sucesso"
      );
    } catch (error) {
      console.error(error);
    }
  }

  async delete(req, res) {
    try {
      const _id = req.params.id;
      OutlayService.delete(_id);
      Helper.sendReponse(res, HttpStatus.OK, "Compra apagada com sucesso");
    } catch (error) {
      console.error(error);
    }
  }
}

export default new OutlayController();
