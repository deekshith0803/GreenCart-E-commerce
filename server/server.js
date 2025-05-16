import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import connectDB from "./configs/db.js";
import "dotenv/config";
import userRoute from "./routes/userRoute.js";
import sellerRoute from "./routes/sellerRoute.js";

const app = express();
const port = process.env.PORT || 4000;

await connectDB();

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

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
