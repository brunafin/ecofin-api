import * as mongoose from "mongoose";

// aqui seria como se fosse a entity do typeorm

const OutlaySchema = new mongoose.Schema({
  description: { type: String },
  price: { type: Number },
  month_year: { type: String },
});

export default OutlaySchema;
