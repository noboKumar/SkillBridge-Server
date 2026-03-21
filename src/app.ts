import express, { Application, Request, Response } from "express";
import cors from "cors";
import { authRoutes } from "./modules/auth/auth.route";
import { tutorRoutes } from "./modules/tutors/tutors.route";

const app: Application = express();

// parsers
app.use(express.json());
app.use(cors());

// auth
app.use("/api/auth", authRoutes);

// tutors
app.use("/api", tutorRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("SkillBridge Server Is Running...");
});

export default app;
