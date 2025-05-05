import dotenv from 'dotenv';
import express, { json } from 'express';
import cors from 'cors';
import connectDB from './config/db.js';

import userRoutes from './routes/userRoutes.js';
import memberRoutes from './routes/memberRoutes.js';
import eventRoutes from './routes/eventRoutes.js';

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(json());

app.use('/users', userRoutes);
app.use('/members', memberRoutes);
app.use('/events', eventRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor rodando na URL: http://localhost:${PORT}`);
});
