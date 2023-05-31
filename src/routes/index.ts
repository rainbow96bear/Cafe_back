import { Router } from "express";

import web3 from "./web3/index";
import upload from "./upload/index";

const router = Router();

router.use("/web3", web3);
router.use("/upload", upload);

export default router;
