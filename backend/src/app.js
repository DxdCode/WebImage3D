import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import imageRoutes from "./routes/imageRoutes.js";
import userRouter from "./routes/userRoutes.js";
import imagePrivateRoutes from "./routes/privateImageRoutes.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();
connectDB();

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true, 
    methods: ["GET", "POST", "PUT", "DELETE"],
  })
);


// Rutas públicas
app.use("/api/user", userRouter);
app.use("/api/images", imageRoutes);

// Rutas privadas
app.use("/api/images/private", imagePrivateRoutes);


app.get("/", (req,res) => res.send({ msg: "Bienvenido" }));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en http://localhost:${PORT}`));
