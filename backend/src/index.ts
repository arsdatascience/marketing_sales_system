import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import leadRoutes from './routes/leadRoutes.js';
import adsRoutes from './routes/adsRoutes.js';
import whatsappRoutes from './routes/whatsappRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();

// Configurar timezone para São Paulo
process.env.TZ = 'America/Sao_Paulo';

const app = express();
const port = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/leads', leadRoutes);
app.use('/api/ads', adsRoutes);
app.use('/api/whatsapp', whatsappRoutes);

app.get('/', (req: Request, res: Response) => {
    res.send('Antigravity API is running');
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
