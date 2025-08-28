import mongoose, { Schema } from "mongoose";

const productSchema = new Schema({
  title: { type: String, required: true },
  image: { type: String, required: true },
  price: { type: Number, required: true },
  stock: { type: Number, required: true, default: 0 },
});

const productModel = mongoose.model('Product', productSchema);// Product is the name at the database

export default productModel;