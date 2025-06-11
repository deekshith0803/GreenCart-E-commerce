import User from "../model/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//register User : /api/user/register
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    //validation
    if (!name || !email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });

    //email validation
    const emailFormate = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailFormate.test(email))
      return res
        .status(400)
        .json({ success: false, message: "Please enter a valid email" });

    //check if user already exists
    const existingUser = await User.findOne({ email: email });
    if (existingUser)
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });

    //hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    //create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    //create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //set cookie
    res.cookie("token", token, {
      httpOnly: true, //prevent JavaScript to access cookie
      secure: process.env.NODE_ENV === "production", //use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry time
    });

    return res.json({
      success: true,
      message: "User created successfully",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//login User : /api/user/login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Login request body:", req.body);


    //validation
    if (!email || !password)
      return res
        .status(400)
        .json({ success: false, message: "Please enter all fields" });

    //check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(400)
        .json({ success: false, message: "User does not exist" });
    }

    //check if password is correct
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid credentials" });
    }

    //create token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    //set cookie
    res.cookie("token", token, {
      httpOnly: true, //prevent JavaScript to access cookie
      secure: process.env.NODE_ENV === "production", //use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection
      maxAge: 7 * 24 * 60 * 60 * 1000, //cookie expiry time
    });

    return res.json({
      success: true,
      message: "User logged in successfully",
      user: {
        email: user.email,
        name: user.name,
      },
    });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//check auth : /api/user/is-auth
export const isAuth = async (req, res) => {
  try {
    const { id: userId } = req.user;
    const user = await User.findById(userId).select("-password");
    return res.json({ success: true, user });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};

//logout User : /api/user/logout
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true, //prevent JavaScript to access cookie
      secure: process.env.NODE_ENV === "production", //use secure cookies in production
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict", //CSRF protection

    });
    return res.json({ success: true, message: "User logged out successfully" });
  } catch (error) {
    console.log(error.message);
    return res.status(500).json({ success: false, message: error.message });
  }
};
