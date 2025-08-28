import express from "express";
import { getAllProducts, seedInitialProducts } from '../Services/prodectServices.js';

const router = express.Router();

router.get("/", async (request, response) => {
  try {
    const products = await getAllProducts();
    response.status(200).json(products);
  } catch (error) {
    response.status(500).json({ message: "Error fetching products" });
  }
});

router.post("/seed", async (request, response) => {
  try {
    await seedInitialProducts();
    response.status(200).json({ message: "Products seeded successfully" });
  } catch (error) {
    response.status(500).json({ message: "Error seeding products" });
  }
});

export default router;