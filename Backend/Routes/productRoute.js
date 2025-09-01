import express from "express";
import { getAllProducts, seedInitialProducts } from '../Services/prodectServices.js';

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const products = await getAllProducts();
    response.status(200).send({data : products});
  } catch (error) {
    response.status(500).send({ data: "Error fetching products" });
  }
});

export default router;