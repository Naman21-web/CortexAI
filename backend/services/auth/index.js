import express from "express";
import dotenv from "dotenv";
import connectDb from "./config/db.js";
import routes from "./routes/auth.route.js"

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use("/",routes)
app.get("/", (req, res) => {
    res.send("Auth service is running");
});

app.listen(port, () => {
    console.log(`Auth service is running on port ${port}`);
    connectDb();
});