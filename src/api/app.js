/* eslint-disable no-undef */
import express from 'express';
import cors from 'cors';
import UsuariosRouter from './routers/usuariosRouter.js'
import dotenv from 'dotenv';
import initializeDatabase from './configs/initializeDatabase.js';

dotenv.config();
const app = express();
app.use(cors());
app.use('/api/v1', UsuariosRouter);

app.get('/api/v1/status', async (req, res) => {
    res.status(200).send("UP");
});

const startServer = async () => {
    try {
        await initializeDatabase();
        const port = process.env.PORT ?? 0;
        const server = app.listen(port, () => {
            const actualPort = server.address().port;
            console.log(`Servidor en ejecución en el puerto http://localhost:${actualPort}/api/v1/status`);
        });
    } catch (error) {
        console.error('Error initializing database:', error);
        process.exit(1);
    }
};

startServer();
