import Product from "../model/product.js"
import Order from "../model/Order.js";

//place order COD : /api/order/cod
export const placeOrderCOD = async (req, res) => {
  try {
    const { userId, items, address } = req.body;
    if (!address || items.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Please add all the required fields",
      });
    }
    //calculate total price using items
    let amoubt = await items.reduce(async (acc, item) => {
      const product = await Product.finfdById(item.product);
      return (await acc) + product.offerPrice * item.quantity;
    }, 0);
    //add tax charge 2%
    amount += Math.floor(amount * 0.02);

    await Order.create({
      userId,
      items,
      amount,
      address,
      paymentType: "COD",
    });
    return res.status(200).json({ success: true, message: "Order placed successfully" });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });  
  }
};

//get order by user id : /api/order/user
export const getUserOrders = async (req, res) => {
  try {
    const { userId } = req.body;
    const orders = await Order.find({ 
      userId,
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product address").sot({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });  
  }
}

//get all orders ( for seller / admin ) : /api/order/seller
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find({ 
      $or: [{ paymentType: "COD" }, { isPaid: true }]
    }).populate("items.product address").sot({ createdAt: -1 });
    return res.status(200).json({ success: true, orders });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });  
  }
}