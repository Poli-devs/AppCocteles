// src/app.js
import express from 'express';
import cors from 'cors';
import path from 'path';
import cocktailsRoutes from './routes/cocktails.routes.js';

const app = express();
app.use(express.json());
app.use(cors({ origin: 'http://localhost:3000' }));
app.use('/uploads', express.static(path.join(process.cwd(), 'uploads')));

app.use('/api/cocktails', cocktailsRoutes);

export default app;
