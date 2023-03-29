import * as mongoose from "mongoose";

class Database {
  private DB_URL = "mongodb://localhost/db_ecofin";
  // private DB_URL = "mongodb://link-db/db_ecofin";

  createConnection() {
    mongoose.connect(this.DB_URL);
  }
}

export default Database;
