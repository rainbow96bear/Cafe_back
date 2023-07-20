import { Router } from "express";
import multer from "multer";

import db from "../../../models/index";
import { Sequelize } from "sequelize";

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
router.post("/admin", upload.single("file"), async (req, res) => {
  const { productType, productKind, name, price, info } = req.body;

  await db.Products.create({
    fileName: req.file?.filename,
    productType: productType,
    productKind: productKind,
    productName: name,
    price: Number(price),
    info: info,
  });

  res.send({ status: 200, message: "등록이 성공하였습니다." });
});
router.get("/admin", async (req, res) => {
  const { product } = req.query;
  let result: any;
  switch (product) {
    case "coffee":
      result = await db.Products.findAll({ where: { productType: "커피" } });
      break;
    case "goods":
      result = await db.Products.findAll({ where: { productType: "굿즈" } });
      break;
  }

  res.send(result);
});

router.delete("/admin", async (req, res) => {
  const { productID } = req.body;
  let result: any;
  try {
    result = await db.Products.destroy({ where: { id: productID } });
    res.send({ status: 200, message: "success" });
  } catch (e) {
    res.send({ status: 400, message: "error" });
  }
});

router.put("/admin", upload.single("file"), async (req, res) => {
  const { productType, productKind, name, price, info, productID } = req.body;

  await db.Products.update(
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

  res.send({ status: 200, message: "성공적으로 수정되었습니다." });
});
router.get("/TopBanner/List", async (req, res) => {
  const result = await db.Products.findAll({
    attributes: [
      [Sequelize.fn("DISTINCT", Sequelize.col("productType")), "test"],
    ],
  });
  console.log(result);
  res.end();
});

export default router;
