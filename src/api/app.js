import express from 'express';
import cors from 'cors';
import UsuariosRouter from './routers/usuariosRouter.js'
import dotenv from 'dotenv';

dotenv.config();
const app = express();
app.use(cors());
app.use('/api/v1', UsuariosRouter);

app.get('/api/v1/status', async (req, res) => {
    res.status(200).send("UP");
});

// eslint-disable-next-line no-undef
const port = process.env.PORT ?? 0
const server = app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto http://localhost:${server.address().port}/api/v1/status`);
});
