import dotenv from 'dotenv';
import nodemailer, { Transporter } from 'nodemailer';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

const transporter: Transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.NODEMAILER_USER,
    pass: process.env.NODEMAILER_PASS,
  },
});

export { transporter };
