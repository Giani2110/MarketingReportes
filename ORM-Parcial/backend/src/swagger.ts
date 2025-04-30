import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerSpec = swaggerJSDoc({
  definition: {
    openapi: "3.0.0",
    info: {
      title: "API de Productos",
      version: "1.0.0",
      description: "Documentación de la API para gestión de productos",
    },
  },
  apis: [
    "./src/controllers/*.ts",   // Archivos que contienen los controladores
    "./src/routes/*.ts",        // Archivos de rutas
  ],
});

export { swaggerSpec, swaggerUi };
