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
  const { productType, productKind, name, price, info } = req.body;

  if (productType == "커피") {
    await db.Coffee.create({
      fileName: req.file?.filename,
      productKind: productKind,
      productName: name,
      price: Number(price),
      info: info,
    });
  }

  res.send({ status: 200, message: "등록이 성공하였습니다." });
});

export default router;
