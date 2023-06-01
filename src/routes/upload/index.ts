import { Router } from "express";
import multer from "multer";

import db from "../../../models/index";

const router = Router();

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});
const upload = multer({
  storage: storage,
});
router.post("/product", upload.single("file"), async (req, res) => {
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
