import { Sequelize } from "sequelize";

import { config } from "../config/config";
import Coffee from "../models/coffee";
import Goods from "../models/goods";

const db: any = { Coffee, Goods };

const sequelize = new Sequelize(
  config.development.database,
  config.development.username as string,
  config.development.password,
  {
    host: config.development.host,
    dialect: "mysql",
    port: 3307,
  }
);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.Pool = Coffee.initModel(sequelize);
db.Pool = Goods.initModel(sequelize);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
