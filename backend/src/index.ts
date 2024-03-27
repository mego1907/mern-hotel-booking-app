import express, { Request, Response } from "express";
import cors from "cors";
import "dotenv/config";
import mongoose from "mongoose";

import userRoutes from "./routes/users";
import authRoutes from "./routes/auth";
import myHotelsRoutes from "./routes/my-hotels";

import cookieParser from "cookie-parser";
import path from "path";
import { v2 as cloudinary } from "cloudinary";
import verifyToken from "./middleware/auth";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// cloudinary.config({
//   cloud_name: "mego1907",
//   api_key: "686969552283617",
//   api_secret: "hNAWOQIf8Jv6aRTOAJZykm3LPlc",
// });

mongoose.connect(process.env.MONGODB_CONNECTION_STRING as string).then(() => {
  console.log("Connected to database");
});

const app = express();
app.use(cookieParser());
app.use(express.json()); // => to convert the body of API request into JSON automatically
app.use(express.urlencoded({ extended: true })); // => help us to parse the URL to get the query parameters
app.use(
  cors({
    origin: process.env.FRONTEND_url,
    credentials: true,
  })
); // => cors is a security thing which means that it will prevent certain requests from certain URLs if it does not agree with them
//  => so for example our UI is going to be on different port to our backend and cors is going to find not found and block the request

app.use("/api/auth", authRoutes);
app.use("/api/users", userRoutes);
app.use("/api/my-hotels", myHotelsRoutes);

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
