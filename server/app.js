import express from "express";
import { Server } from "socket.io";
import userRouter from "./routes/user.js";
import messageRouter from "./routes/message.js";
import roomsRouter from "./routes/room.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleWare } from "./middlewares/errorHandling.js";
import cors from "cors";
import { createServer } from "http";
import { isAuthenticated } from "./middlewares/auth.js";
import { User } from "./models/user.js";
import helmet from "helmet";
import morgan from "morgan";
import jwt from "jsonwebtoken";
import { Message } from "./models/message.js";
import validator from "validator";
import validUrl from "valid-url";



export const app = express();
export const server = new createServer(app);
try {
  config({ path: "./data/config.env" });
  console.log("Environment variables loaded from config.env");
} catch (error) {
  console.error("Error loading environment variables:", error);
}
const frontendOrigin = [
  "http://localhost:5173",
  "https://chat-io-zeta.vercel.app",
];

export const io = new Server(server, {
  cors: {
    origin: frontendOrigin,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

//using middleware
app.use(helmet());
app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());

app.use(
  cors({
    origin: frontendOrigin,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  })
);
app.get("/", (req, res) => {
  res.send("working");
});
//using Routes
app.use("/api/v1/users", userRouter);
app.use("/api/v1/rooms", roomsRouter);
app.use("/api/v1/m", messageRouter);

io.on('connection', (socket) => {
  console.log('New client connected');

  socket.on('joinRoom', (roomId) => {
    socket.join(roomId);
  });

  socket.on('sendMessage', async (message) => {
    if (!validUrl.isUri(message.content)) {
      message.content = validator.escape(message.content);
    }
    const newMessage = new Message(message);
    await newMessage.save();
    io.to(message.roomId).emit('message', await newMessage.populate('sender', 'name image'));
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});


app.use(errorMiddleWare);
