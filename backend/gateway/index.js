import express from "express";
import dotenv from "dotenv";
import proxy from "express-http-proxy";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { getCurrentUser } from "./controllers/user.controller.js";
import { protect } from "./middleware/auth.middleware.js";
import { proxyWithHeaders } from "./utils/proxyWithHeaders.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(cors({
origin: (origin, callback) => {
  const allowedOrigins = [
    process.env.FRONTEND_URL,
    "http://localhost:5174",
    "http://127.0.0.1:5174"
  ].filter(Boolean);

  if (!origin || allowedOrigins.includes(origin)) {
    callback(null, true);
    return;
  }

  callback(new Error("Origin is not allowed by CORS"));
},
  credentials: true
}));
app.use(morgan("dev"));
app.use(cookieParser());
app.use("/api/auth",proxy(process.env.AUTH_SERVICE));
app.use("/api/chat",protect,proxyWithHeaders(process.env.CHAT_SERVICE));
app.use("/api/agent",protect,proxy(process.env.AGENT_SERVICE));

app.get("/api/me",protect,getCurrentUser);
app.get("/", (req, res) => {
    res.send("Gateway is running");
});

app.listen(port, () => {
    console.log(`Gateway is running on port ${port}`);
});