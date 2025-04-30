# 📊 Backend - Sistema de Reportes Automatizados

Este sistema automatiza la recolección, limpieza, almacenamiento y generación de reportes de datos para una empresa de marketing digital. Reúne información desde múltiples fuentes (como APIs, archivos y bases de datos), la centraliza y permite obtener reportes organizados en Excel. También gestiona datos de clientes, productos, transacciones, sucursales y stock, integrando todo desde una interfaz web. 

---

## 🚀 Tecnologías principales

- **TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **Swagger** para documentación de la API

---

## ✅ Requisitos previos
- Node.js v18+
- PostgreSQL instalado y corriendo
- Acceso a una terminal

---

## 📦 Instalación y configuración

1. **Cloná el repositorio**  
   ```bash
   git clone https://github.com/Giani2110/MarketingReportes.git
   git clone git@github.com:Giani2110/MarketingReportes.git
   ```

---
### Los comandos serán usados dentro de la carpeta ./backend
---
2. **Instalá las dependencias**
   ```bash
   npm install
   ```
3. **Crear Clientes**
   - hay un archivo en src/scripts que crea algunos clientes a modo de ejemplo
   ```bash
   npx tsx src/scripts/crearClientes.ts
   ```
4. **Correr el proyecto**
   - Para ver los endpoints con swagger utilizar en ./backend
   ```bash
   npm run dev
   ```
5. **Otros comandos**
   Genera el cliente Prisma
```bash
   npm run prisma:generate
   ```
Aplica migraciones a la base de datos          
```bash
   npm run prisma:migrate
   ```
Abre una interfaz visual para la base de datos 
```bash
   npx prisma studio
   ```

---

##🧾 Documentación del proyecto
- https://docs.google.com/document/d/159es5-xB-u7AKz3d6HiMRBeNq_KlpkgeIeafQjdbRR4/edit?tab=t.0

---

##🛠️ Notas
-Usamos arquitectura en capas (controller → service → Prisma).
-Prisma se encarga de la conexión y consultas a la base de datos.
-Swagger facilita probar los endpoints desde el navegador.

---

##🧑‍💻 Autor
- Gianfranco Andreachi
