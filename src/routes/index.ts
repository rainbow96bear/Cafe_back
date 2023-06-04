import { Router } from "express";

import web3 from "./web3/index";
import upload from "./upload/index";
import productList from "./productList/index";

const router = Router();

router.use("/web3", web3);
router.use("/upload", upload);
router.use("/productList", productList);

export default router;
