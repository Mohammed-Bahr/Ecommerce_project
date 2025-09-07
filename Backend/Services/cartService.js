import cartModel from "../Models/cartModel.js";
import productModel from "../Models/productModel.js";
import orderModel from "../Models/orderModel.js";
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
  populateProduct: Boolean,
};
export const getActiveCartForUser = async ({ userID , populateProduct }) => {
  try {
    let cart = await cartModel.findOne({ userId: userID, status: "active" });

    if (!cart) {
      cart = await createCartForUser({ userID });
    }

    if (populateProduct) {
      cart = await cartModel.findOne({ userId: userID, status: "active" }).populate('items.product');
    }

    return cart;
  } catch (error) {
    console.error("Error getting active cart:", error);
    throw error;
  }
};

export const addItemToCart = async ({ userID, productID, quantity }) => {
  try {
    const cart = await getActiveCartForUser({ userID });

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

    const populatedCart = await getActiveCartForUser({ userID, populateProduct: true });
    return {
      data: populatedCart,
      statusCode: 201,
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
    const cart = await getActiveCartForUser({ userID });
    const existsInCart = cart.items.find(
      (p) => p.product.toString() === productID
    );
    const product = await productModel.findById(productID);

    if (!existsInCart) {
      return { data: "item does not exist in cart", statusCode: 400 };
    }

    if (!product) {
      return { data: "Product not found!", statusCode: 400 };
    }

    if (product.stock < quantity) {
      return { data: "Low stock for item", statusCode: 400 };
    }

    existsInCart.quantity = quantity;

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

    const populatedCart = await getActiveCartForUser({ userID, populateProduct: true });
    return {
      data: populatedCart,
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

export const deleteItemInCart = async ({ userID, productID }) => {
  try {
    const cart = await getActiveCartForUser({ userID });
    const existsInCart = cart.items.find(
      (p) => p.product.toString() === productID
    );
    if (!existsInCart) {
      return { data: "item does not exist in cart", statusCode: 400 };
    }

    const otherCartItems = cart.items.filter(
      (p) => p.product.toString() !== productID
    );

    let total = otherCartItems.reduce((sum, product) => {
      sum += product.quantity * product.unitPrice;
      return sum;
    }, 0);

    cart.items = otherCartItems;
    cart.totalAmount = total;

    await cart.save();

    return {
      data: cart,
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

export const clearItemInCart = async ({ userID }) => {
  try {
    const cart = await getActiveCartForUser({ userID });

    cart.items = [];
    cart.totalAmount = 0;

    await cart.save();
    return {
      data: cart,
      statusCode: 200,
    };
  } catch (error) {
    console.error("Error clearing cart item:", error);
    return {
      data: `something went wrong sorry try again , ${error}`,
      statusCode: 500,
    };
  }
};

export const checkout = async ({ userID, address }) => {
  try {
    if (!address) {
      return { data: "please enter your address first", statusCode: 400 };
    }
    // if (!userID) {
    //   return { data: "please enter your userID first", statusCode: 400 };
    // }
    //------------------------------------------------------------
    const cart = await getActiveCartForUser({ userID });
    const orderItems = [];
    // loop cartItems to take each product and put it in order product
    for (const item of cart.items) {
      const product = await productModel.findById(item.product);
      if (!product) {
        return {
          data: "product not found",
          statusCode: 400,
        };
      }

      const orderItem = {
        productTitle: product.title,
        productImage: product.image,
        quantity: item.quantity,
        unitPrice: item.unitPrice,
      };

      orderItems.push(orderItem);
    }
    const order = await orderModel.create({
      orderItems,
      total: cart.totalAmount,
      address,
      userID,
    });

    await order.save();
    //update the cart status to be completed
    cart.status = "completed";
    await cart.save();

    return {
      data: order,
      statusCode: 200,
    };
  } catch (error) {
    return {
      data: `something went wrong sorry try again here is the error -> ${error}`,
      statusCode: 500,
    };
  }
};
