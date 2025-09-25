import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import imageRoutes from "./routes/imageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import imagePrivateRoutes from "./routes/privateImageRoutes.js";
import cors from "cors";

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());

// Rutas públicas
app.use("/api/images", imageRoutes);

// Rutas privadas
app.use("/api/images/private", imagePrivateRoutes);

// Users
app.use("/api/user", userRouter);

app.get("/", (req,res) => res.send({ msg: "Bienvenido" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
