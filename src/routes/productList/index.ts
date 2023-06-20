import { Router } from "express";

import db from "../../../models/index";

const router = Router();

router.get("/getList", async (req, res) => {
  const { product } = req.query;
  let result: any;
  switch (product) {
    case "coffee":
      result = await db.Coffee.findAll();
      break;
    case "goods":
      result = await db.Goods.findAll();
      break;
  }
  res.send(result);
});

export default router;
