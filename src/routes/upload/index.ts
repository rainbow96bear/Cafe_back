import { Router } from "express";
import db from "../../../models/index";

const router = Router();

router.post("/product", async (req, res) => {
  const { image, productType, productKind, name, price, info } = req.body;

  if (productType == "커피") {
    await db.Coffee.create({
      fileName: image.path,
      productKind: productKind,
      productName: name,
      price: Number(price),
      info: info,
    });
  }
  res.send(req.body);
});

export default router;
