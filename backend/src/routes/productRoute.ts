import express from "express";
import { getAllProducts, getProductById } from "../services/productService";

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    const products = await getAllProducts();
    res.status(200).send(products);
  } catch {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const product = await getProductById(id);
    if (!product) {
       res.status(404).json({ error: "Product not found" });
       return;
    }
    res.status(200).send(product);
  } catch {
    res.status(500).json({ error: "Something went wrong!" });
  }
});

export default router;
