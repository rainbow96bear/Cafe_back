import * as dotenv from "dotenv";
dotenv.config();

export const config = {
  development: {
    username: "root",
    password: "1234",
    database: "cafe",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3307",
  },
  test: {
    username: "root",
    password: "1234",
    database: "cafe",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3307",
  },
  production: {
    username: "root",
    password: "1234",
    database: "cafe",
    host: "127.0.0.1",
    dialect: "mysql",
    port: "3307",
  },
};
