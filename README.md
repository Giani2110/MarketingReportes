# 📊 Backend - Sistema de Reportes Automatizados

Este sistema permite la carga de productos a la base de datos mediante archivos .CSV o .JSON, se cargan desde la web, al momento de ser cargados le llegará un mail al equipo de marketing con todos los detalles de los nuevos productos, cada 24 horas a las 8.AM se genera un reporte automático con todos los productos cargados en el último día, también este reporte se envia al mail.

---

## 🚀 Tecnologías principales

- **TypeScript**
- **Express**
- **Prisma ORM**
- **PostgreSQL**
- **Swagger** para documentación de la API
- **ReactJS** para la carga de archivos desde la web

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
### Los comandos serán usados dentro de la carpeta ./frontend
---

6. **Instalá las dependencias**
```bash
   npm install
   ```
7. **Correr la web**
```bash
   npm run dev
   ```
   Al correr la web se cargarán automaticamente a la base de datos 10 categorias de productos
---

## 🧾 Documentación del proyecto
- https://docs.google.com/document/d/159es5-xB-u7AKz3d6HiMRBeNq_KlpkgeIeafQjdbRR4/edit?tab=t.0

---

## 🛠️ Notas
-Usamos arquitectura en capas (controller → service → Prisma).
-Prisma se encarga de la conexión y consultas a la base de datos.

---

## 🧑‍💻 Autor
- Gianfranco Andreachi
