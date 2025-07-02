import express from "express";
import productoRoutes from "./routes/productoRoutes";
import clienteRoutes from "./routes/clienteRoutes";
import categoriaRoutes from "./routes/categoriaRoutes";
import { swaggerUi, swaggerSpec } from "./swagger";
import './events/productosReportHandler';
import uploadRoutes from "./routes/uploadRoutes"; 
import cors from 'cors';
import './events/scheduler/productosScheduler';
import reporteRoutes from './routes/reporteRoutes';


const app = express();

// Frontend
app.use(cors({
  origin: 'http://localhost:5173', // o '*' para permitir todo
  credentials: false
}));

app.use(express.json());

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use("/api", productoRoutes);
app.use("/api", clienteRoutes);
app.use("/api", categoriaRoutes);
app.use('/api', uploadRoutes); 
app.use('/api', reporteRoutes);


app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
  console.log("Documentación en http://localhost:3000/api-docs");
});
