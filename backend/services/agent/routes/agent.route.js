import express from 'express';
import { agent } from '../controllers/agent.controller';

const router = express.router();

router.post("/chat",agent);

export default router;