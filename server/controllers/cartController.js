import User from "../model/User.js";

//update user cartData : /api/cart/update
export const updateCart = async (req, res) => {
  try {
    const cartData = req.body.cartItems;
    const userId = req.user._id;

    console.log("Incoming cart update", {
      cartItems: req.body.cartItems,
      userId: req.user?._id,
    });

    await User.findByIdAndUpdate(userId, { cartItems: cartData });

    res
      .status(200)
      .json({ success: true, message: "Cart updated successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
