import jwt from "jsonwebtoken";

const authUser = (req, res, next) => {
  const { token } = req.cookies;
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Please login first",
    });
  }
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET );
    if (tokenDecode.id) {
      req.user = { id: tokenDecode.id };
    } else {
      return res.status(401).json({
        success: false,
        message: "",
      });
    }
    next();
  } catch (error) {
    res.status(401).json({
      success: false,
      message: error.message ,
    });
  }
};


export default authUser;
