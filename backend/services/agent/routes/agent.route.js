import express from 'express';
import { agent } from '../controllers/agent.controller.js';
import multer from "../config/multer.js"

const router = express.Router();

router.post("/chat", multer.single("file"), (error, req, res, next) => {
    if(error?.code === "LIMIT_FILE_SIZE"){
        return res.status(413).json({ message: "File exceeds the 20 MB upload limit." });
    }
    if(error?.code === "INVALID_FILE_TYPE"){
        return res.status(400).json({ message: error.message });
    }
    next(error);
}, agent);

export default router;