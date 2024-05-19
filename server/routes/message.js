import express from "express";
import { isAuthenticated } from "../middlewares/auth.js";

import { Message } from "../models/message.js";

const router = express.Router();


router.get('/:roomId/messages', isAuthenticated,async (req, res) => {
    try {
      const messages = await Message.find({ roomId: req.params.roomId }).populate('sender', 'name image');
      res.json(messages);
    } catch (error) {
      res.status(500).send('Server error');
    }
  });

export default router;  