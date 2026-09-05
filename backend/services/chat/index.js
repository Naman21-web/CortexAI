import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/chat.route.js"

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());

app.use("/",router);
app.get("/", (req, res) => {
    res.send("Chat service is running");
});

app.listen(port, () => {
    console.log(`Chat service is running on port ${port}`);
    connectDb();
});