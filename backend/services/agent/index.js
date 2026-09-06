import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import router from "./routes/agent.route.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use("/",router);
app.get("/", (req, res) => {
    res.send("Agent service is running");
});

app.listen(port, () => {
    console.log(`Agent service is running on port ${port}`);
    connectDb();
});