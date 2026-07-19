import dns from "node:dns";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
import { authRouter } from "./routes/auth.js";
import { connectDB } from "./config/db.js";
import cors from 'cors'
import { todoRouter } from "./routes/todos.js";

const app = express();

app.use(express.json());
app.use(cors())

connectDB();

app.use('/api/auth', authRouter);
app.use('/api/todo', todoRouter);

app.listen(3000, () => console.log("Server is running"));