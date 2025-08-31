import express from "express";
import { getActiveCardForUser } from "../Services/cartService.js";
import {
  addItemToCart,
  updateItemInCart,
  deleteItemInCart,
  clearItemInCart,
} from "../Services/cartService.js";
import validateJWT from "../validation/validateJWT.js";
import { useId } from "react";

const router = express.Router();

router.get("/", validateJWT, async (req, res) => {
  try {
    const userID = req.user._id;
    const cart = await getActiveCardForUser({ userID });
    res.status(200).send(cart);
  } catch (error) {
    console.error("Cart route error:", error);
    res.status(500).send({
      success: false,
      message: "Failed to get cart",
      error: error.message,
    });
  }
});

router.post("/items", validateJWT, async (req, res) => {
  const userID = req.user._id;
  const { productID, quantity } = req.body;
  if(quantity === 0){
    res.status(400).send("zero not valid");
  }

  const response = await addItemToCart({ userID, productID, quantity });
  res.status(response.statusCode).send(response.data);
});

router.put("/items", validateJWT, async (req, res) => {
  const userID = req.user._id;
  const { productID, quantity } = req.body;
  if(quantity === 0){
    res.status(400).send("zero not valid");
  }
  const response = await updateItemInCart({ userID, productID, quantity });
  res.status(response.statusCode).send(response.data);
});

router.delete("/items/:productID", validateJWT, async (req, res) => {
  const userID = req.user._id;
  const { productID } = req.params;
  const response = await deleteItemInCart({ userID, productID });
  res.status(response.statusCode).send(response.data);
});

router.delete("/", validateJWT, async (req, res) => {
  const userID = req.user._id;
  const response = await clearItemInCart({ userID });
  res.status(response.statusCode).send(response.data);
});

export default router;
