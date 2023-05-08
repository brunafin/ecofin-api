import OutlayRepository from "../repository/outlayRepository";
import { type Types } from "mongoose";
// faz as queries

class OutlayService {
  async get() {
    const result = await OutlayRepository.find({});
    return result;
  }

  async getById(_id: Types.ObjectId) {
    const result = await OutlayRepository.findById(_id);
    return result;
  }

  async create(outlay: any) {
    const obj = {
      ...outlay,
      price: outlay.price * 100,
    };

    const result = await OutlayRepository.create(obj);
    return result;
  }

  async update(__id: number, outlay: any) {
    const result = await OutlayRepository.findByIdAndUpdate(__id, outlay);
    return result;
  }

  async delete(__id: number) {
    const result = await OutlayRepository.findByIdAndRemove(__id);
    return result;
  }
}

export default new OutlayService();
