-- CreateTable
CREATE TABLE "Cliente" (
    "cliente_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(100) NOT NULL,
    "telefono" VARCHAR(30) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "fecha_registro" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Cliente_pkey" PRIMARY KEY ("cliente_id")
);

-- CreateTable
CREATE TABLE "Producto" (
    "producto_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "precio_base" DECIMAL(10,2) NOT NULL,
    "categoria_id" INTEGER NOT NULL,
    "ultima_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Producto_pkey" PRIMARY KEY ("producto_id")
);

-- CreateTable
CREATE TABLE "Categoria" (
    "categoria_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "descripcion" TEXT NOT NULL,

    CONSTRAINT "Categoria_pkey" PRIMARY KEY ("categoria_id")
);

-- CreateTable
CREATE TABLE "Sucursal" (
    "sucursal_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "direccion" VARCHAR(255) NOT NULL,
    "telefono" VARCHAR(30) NOT NULL,
    "ultima_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Sucursal_pkey" PRIMARY KEY ("sucursal_id")
);

-- CreateTable
CREATE TABLE "Transaccion" (
    "transaccion_id" SERIAL NOT NULL,
    "cliente_id" INTEGER NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "sucursal_id" INTEGER NOT NULL,
    "fuente_datos_id" INTEGER NOT NULL,
    "metodo_pago_id" INTEGER NOT NULL,
    "fecha_" TIMESTAMP(3) NOT NULL,
    "total" DECIMAL(10,2) NOT NULL,

    CONSTRAINT "Transaccion_pkey" PRIMARY KEY ("transaccion_id")
);

-- CreateTable
CREATE TABLE "Stock" (
    "stock_id" SERIAL NOT NULL,
    "producto_id" INTEGER NOT NULL,
    "sucursal_id" INTEGER NOT NULL,
    "cantidad" DECIMAL(10,2) NOT NULL,
    "ultima_actualizacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Stock_pkey" PRIMARY KEY ("stock_id")
);

-- CreateTable
CREATE TABLE "FuenteDatos" (
    "fuente_datos_id" SERIAL NOT NULL,
    "tipo" VARCHAR(50) NOT NULL,
    "descripcion" TEXT NOT NULL,
    "sucursal_id" INTEGER,

    CONSTRAINT "FuenteDatos_pkey" PRIMARY KEY ("fuente_datos_id")
);

-- CreateTable
CREATE TABLE "MetodoPago" (
    "metodo_pago_id" SERIAL NOT NULL,
    "nombre" VARCHAR(50) NOT NULL,
    "descripcion" VARCHAR(255) NOT NULL,

    CONSTRAINT "MetodoPago_pkey" PRIMARY KEY ("metodo_pago_id")
);

-- CreateTable
CREATE TABLE "ReporteGenerado" (
    "reporte_id" SERIAL NOT NULL,
    "transaccion_id" INTEGER NOT NULL,
    "fecha_generacion" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ReporteGenerado_pkey" PRIMARY KEY ("reporte_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Cliente_email_key" ON "Cliente"("email");

-- CreateIndex
CREATE INDEX "Cliente_email_idx" ON "Cliente"("email");

-- CreateIndex
CREATE INDEX "Cliente_telefono_idx" ON "Cliente"("telefono");

-- CreateIndex
CREATE INDEX "Producto_nombre_idx" ON "Producto"("nombre");

-- CreateIndex
CREATE INDEX "Producto_categoria_id_idx" ON "Producto"("categoria_id");

-- CreateIndex
CREATE INDEX "Transaccion_cliente_id_idx" ON "Transaccion"("cliente_id");

-- CreateIndex
CREATE INDEX "Transaccion_producto_id_idx" ON "Transaccion"("producto_id");

-- CreateIndex
CREATE INDEX "Transaccion_sucursal_id_idx" ON "Transaccion"("sucursal_id");

-- CreateIndex
CREATE INDEX "Transaccion_fecha__idx" ON "Transaccion"("fecha_");

-- CreateIndex
CREATE INDEX "Stock_producto_id_idx" ON "Stock"("producto_id");

-- CreateIndex
CREATE INDEX "Stock_sucursal_id_idx" ON "Stock"("sucursal_id");

-- CreateIndex
CREATE UNIQUE INDEX "Stock_producto_id_sucursal_id_key" ON "Stock"("producto_id", "sucursal_id");

-- CreateIndex
CREATE UNIQUE INDEX "ReporteGenerado_transaccion_id_key" ON "ReporteGenerado"("transaccion_id");

-- AddForeignKey
ALTER TABLE "Producto" ADD CONSTRAINT "Producto_categoria_id_fkey" FOREIGN KEY ("categoria_id") REFERENCES "Categoria"("categoria_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_cliente_id_fkey" FOREIGN KEY ("cliente_id") REFERENCES "Cliente"("cliente_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_sucursal_id_fkey" FOREIGN KEY ("sucursal_id") REFERENCES "Sucursal"("sucursal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_fuente_datos_id_fkey" FOREIGN KEY ("fuente_datos_id") REFERENCES "FuenteDatos"("fuente_datos_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaccion" ADD CONSTRAINT "Transaccion_metodo_pago_id_fkey" FOREIGN KEY ("metodo_pago_id") REFERENCES "MetodoPago"("metodo_pago_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_producto_id_fkey" FOREIGN KEY ("producto_id") REFERENCES "Producto"("producto_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Stock" ADD CONSTRAINT "Stock_sucursal_id_fkey" FOREIGN KEY ("sucursal_id") REFERENCES "Sucursal"("sucursal_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FuenteDatos" ADD CONSTRAINT "FuenteDatos_sucursal_id_fkey" FOREIGN KEY ("sucursal_id") REFERENCES "Sucursal"("sucursal_id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ReporteGenerado" ADD CONSTRAINT "ReporteGenerado_transaccion_id_fkey" FOREIGN KEY ("transaccion_id") REFERENCES "Transaccion"("transaccion_id") ON DELETE RESTRICT ON UPDATE CASCADE;
