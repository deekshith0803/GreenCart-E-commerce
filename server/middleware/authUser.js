// middleware/authUser.js
import jwt from "jsonwebtoken";
import User from "../model/User.js";

// const authUser = (req, res, next) => {
//   const token = req.cookies;
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Please login first",
//     });
//   }
//   try {
//     const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
//     if (tokenDecode.id) {
//       req.user = { _id: tokenDecode.id };
//       next();
//     } else {
//       return res.status(401).json({
//         success: false,
//         message: "Please login first",
//       });
//     }
//     next();
//   } catch (error) {
//     res.status(401).json({
//       success: false,
//       message: error.message,
//     });
//   }
// };

// middleware
export const authUser = async (req, res, next) => {
  try {
    const token = req.cookies.token;
    if (!token)
      return res.status(401).json({ success: false, message: "Unauthorized" });

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select("-password");

    if (!user)
      return res
        .status(401)
        .json({ success: false, message: "User not found" });

    req.user = user;
    next();
  } catch (err) {
    return res.status(401).json({ success: false, message: "Invalid token" });
  }
};

export default authUser;
