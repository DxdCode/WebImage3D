import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import imageRoutes from "./routes/imageRoutes.js";

dotenv.config();
connectDB();

const app = express();
app.use(express.json());

app.use("/api/images", imageRoutes);

app.get("/",(req,res)=>{
    res.send({msg:"Bienvenido"})
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Servidor corriendo en puerto  http://localhost:${PORT}`));
