import nodemailer from 'nodemailer';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
  tls: {
    rejectUnauthorized: false,
  },
});


export const enviarReportePorEmail = async (reportePath: string) => {
  const archivoNombre = path.basename(reportePath);

  await transporter.sendMail({
    from: `"Sistema Reportes" <${process.env.EMAIL_USER}>`,
    to: 'gianfranco.andreachi@davinci.edu.ar', 
    subject: '📊 Reporte de productos importados',
    text: 'Adjunto se encuentra el reporte generado automáticamente.',
    attachments: [
      {
        filename: archivoNombre,
        path: reportePath,
      },
    ],
  });

  console.log(`📨 Reporte enviado`);
};
