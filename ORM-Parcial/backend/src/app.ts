// src/app.ts
import express from "express";
import productoRoutes from "./routes/productoRoutes";
import clienteRoutes from "./routes/clienteRoutes"; // Importar rutas de clientes
import categoriaRoutes from "./routes/categoriaRoutes"; // Importar rutas de categorías
import { swaggerUi, swaggerSpec } from "./swagger";
import './events/productosReportHandler';


const app = express();

app.use(express.json());

// Documentación Swagger
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rutas
app.use("/api", productoRoutes);
app.use("/api", clienteRoutes);
app.use("/api", categoriaRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en el puerto 3000");
  console.log("Documentación en http://localhost:3000/api-docs");
});
