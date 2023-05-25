import express, { Express, Request, Response, NextFunction } from "express";
import session from "express-session";
import path from "path";
import dotenv from "dotenv";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import API from "./routes/index";

import * as bip39 from "bip39";
import HDKey from "hdkey";
import Wallet from "ethereumjs-wallet";

// function generateWalletFromMnemonic(mnemonic: string): any {
//   const seed = bip39.mnemonicToSeedSync(mnemonic);
//   const root = HDKey.fromMasterSeed(seed);
//   const derived = root.derive("m/44'/60'/0'/0/0");
//   const privateKey = derived.privateKey;
//   const wallet = Wallet.fromPrivateKey(privateKey);

//   console.log("seed", seed);
//   console.log("----------");
//   console.log("root", root);
//   console.log("----------");
//   console.log("derived", derived);
//   console.log("----------");
//   console.log("privateKey", privateKey);
//   console.log("----------");
//   console.log("wallet", wallet);
//   console.log("----------");

//   return wallet;
// }

// const mnemonic = bip39.generateMnemonic();
// const wallet = generateWalletFromMnemonic(mnemonic);

// console.log("Mnemonic:", mnemonic);
// console.log("----------");
// console.log("wallet:", wallet);
// console.log("----------");
// console.log("Address:", wallet.getAddressString());
// console.log("----------");
// console.log("Private Key:", wallet.getPrivateKeyString());
// console.log("----------");

dotenv.config();

const app: Express = express();
app.set("port", process.env.PORT || 8080);
app.use("/", express.static(path.join(__dirname, "build")));
app.use(cors({ origin: true, credentials: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use((req: Request, res: Response, next: NextFunction) => {
  if (process.env.NODE_ENV == "production") {
    morgan("combined")(req, res, next);
  } else {
    morgan("dev")(req, res, next);
  }
});

app.use(
  session({
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false,
    },
    secret: String(process.env.COOKIE_SECRET),
    name: "session",
  })
);
app.use("/api", API);
app.listen(app.get("port"), () => {
  console.log("서버 열음");
});
