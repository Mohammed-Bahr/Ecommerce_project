import cartModel from "../Models/cartModel.js";
import productModel from "../Models/productModel.js";

const CreateCartForUser = {
  userID: String,
};
const createCartForUser = async ({ userID }) => {
  try {
    const cart = await cartModel.create({
      userId: userID,
      items: [],
      totalAmount: 0,
      status: "active",
    });
    await cart.save();
    return cart;
  } catch (error) {
    console.error("Error creating cart:", error);
    throw error;
  }
};

const activeCard = {
  userID: String,
};
export const getActiveCardForUser = async ({ userID }) => {
  try {
    let cart = await cartModel.findOne({ userId: userID, status: "active" });

    if (!cart) {
      cart = await createCartForUser({ userID });
    }

    return cart;
  } catch (error) {
    console.error("Error getting active cart:", error);
    throw error;
  }
};

export const addItemToCart = async ({ userID, productID, quantity }) => {
  try {
    // Fixed typo: getActiveCardForUser -> getActiveCartForUser
    const cart = await getActiveCardForUser({ userID });

    // Fixed typo: prodectID -> productID
    const existsInCart = cart.items.find(
      (p) => p.product.toString() === productID
    );

    if (existsInCart) {
      return { data: "Item already exists in the cart!", statusCode: 400 };
    }

    // Fixed: productModel.find -> productModel.findOne (assuming you want a single product)
    // Also fixed the query parameter structure
    const product = await productModel.findOne({ _id: productID });

    if (!product) {
      return { data: "Product not found", statusCode: 404 };
    }

    if (product.stock < quantity) {
      return { data: "Low stock for item", statusCode: 400 };
    }

    // Add the item to cart
    cart.items.push({
      product: productID,
      unitPrice: product.price,
      quantity,
    });

    cart.totalAmount += product.price * quantity;

    // Save the updated cart
    await cart.save();

    return {
      data: await getActiveCardForUser({ userID }),
      statusCode: 201,
      cart: cart,
    };
  } catch (error) {
    return {
      data: "Error adding item to cart",
      statusCode: 500,
      error: error.message,
    };
  }
};

export const updateItemInCart = async ({ userID, productID, quantity }) => {
  try {
    const cart = await getActiveCardForUser({ userID });
    const existsInCart = cart.items.find(
      (p) => p.product.toString() === productID
    );
    const product = await productModel.findById(productID);

    if (!existsInCart) {
      return { data: "item does not exist in cart", statusCode: 400 };
    }
    existsInCart.quantity = quantity;

    if (!product) {
      return { data: "Product not found!", statusCode: 400 };
    }

    if (product.stock < quantity) {
      return { data: "Low stock for item", statusCode: 400 };
    }

    const otherCartItems = cart.items.filter(
      (p) => p.product.toString() !== productID
    );

    let total = otherCartItems.reduce((sum, product) => {
      sum += product.quantity * product.unitPrice;
      return sum;
    }, 0);

    total += existsInCart.quantity * existsInCart.unitPrice;

    cart.totalAmount = total;

    await cart.save();

    return {
      data: await getActiveCardForUser({ userID, populateProduct: true }),
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error updating cart item:", error);
    return {
      data: "something went wrong sorry try again",
      statusCode: 500,
    };
  }
};
