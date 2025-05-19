import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";
import connectCloudinary from "./configs/cloudinary.js";
import productRoute from "./routes/productRoute.js";
import cartRoute from "./routes/cartRoute.js";
import addressRoute from "./routes/addressRoute.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();
await connectCloudinary()

//allow multiple origins
const allowedOrigins = ["http://localhost:5173"];

// middlewares config
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.get("/", (req, res) => {
  res.send("API is running");
});

app.use("/api/user", userRoute);
app.use("/api/seller ", sellerRoute);
app.use("/api/product", productRoute);
app.use("/api/cart", cartRoute);
app.use("/api/address", addressRoute);

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
