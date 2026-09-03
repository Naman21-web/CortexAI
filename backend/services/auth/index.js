import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.get("/", (req, res) => {
    res.send("Auth service is running");
});

app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`);
    connectDb();
});