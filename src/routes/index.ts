import { Router } from "express";

import web3 from "./web3/index";

const router = Router();

router.use("/web3", web3);

export default router;
