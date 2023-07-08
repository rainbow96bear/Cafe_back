import { Router } from "express";

import web3 from "./web3/index";
import product from "./product/index";

const router = Router();

router.use("/web3", web3);
router.use("/product", product);

export default router;
