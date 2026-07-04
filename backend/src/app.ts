import express from "express";
import cors from "cors";
import authRoutes from "./routes/auth.routes";
import resumeRoutes from "./routes/resume.routes";

const app = express();

app.use(cors());
app.use(express.json());



app.use("/api/auth", authRoutes);
app.use("/api/resume", resumeRoutes);


export default app;