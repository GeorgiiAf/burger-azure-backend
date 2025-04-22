import { getProductById, listAllProducts, getProductByType } from "../models/product-model.js";

const getAllProducts = async (req, res) => {
  res.json(listAllProducts())

};

const getProduct = (req, res) => {
  const product = getProductById(req.params.id);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });
  }
}

const ProductByType = (req, res) => {
  const product = getProductByType(req.params.type);
  if (product) {
    res.json(product);
  } else {
    res.status(404).json({ message: "Product not found" });

}}


export { getAllProducts, getProduct, ProductByType };
