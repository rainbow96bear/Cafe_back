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
router.post("/upload", upload.single("file"), async (req, res) => {
  const { productType, productKind, name, price, info } = req.body;
  if (productType == "커피") {
    await db.Coffee.create({
      fileName: req.file?.filename,
      productType: productType,
      productKind: productKind,
      productName: name,
      price: Number(price),
      info: info,
    });
  } else if (productType == "굿즈") {
    await db.Goods.create({
      fileName: req.file?.filename,
      productType: productType,
      productKind: productKind,
      productName: name,
      price: Number(price),
      info: info,
    });
  }

  res.send({ status: 200, message: "등록이 성공하였습니다." });
});
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

router.delete("/delete", async (req, res) => {
  const { product } = req.query;
  const { productID } = req.body;
  let result: any;
  try {
    switch (product) {
      case "coffee":
        result = await db.Coffee.destroy({ where: { id: productID } });
        break;
      case "goods":
        result = await db.Goods.destroy({ where: { id: productID } });
        break;
    }
    console.log("result : ", result);
    res.send({ status: 200, message: "success" });
  } catch (e) {
    res.send({ status: 400, message: "error" });
  }
});

router.put("/modify", upload.single("file"), async (req, res) => {
  const { productType, productKind, name, price, info, productID } = req.body;
  if (productType == "커피") {
    await db.Coffee.update(
      {
        fileName: req.file?.filename,
        productType: productType,
        productKind: productKind,
        productName: name,
        price: Number(price),
        info: info,
      },
      {
        where: {
          id: productID,
        },
      }
    );
  } else if (productType == "굿즈") {
    await db.Goods.update(
      {
        fileName: req.file?.filename,
        productType: productType,
        productKind: productKind,
        productName: name,
        price: Number(price),
        info: info,
      },
      {
        where: {
          id: productID,
        },
      }
    );
  }

  res.send({ status: 200, message: "성공적으로 수정되었습니다." });
});

export default router;
