import express from 'express';
import cors from 'cors';
import UsuariosRouter from './routers/usuariosRouter.js'

const app = express();
app.use(cors());
app.use('/api/v1', UsuariosRouter);

app.get('/api/v1/status', async (req, res) => {
    res.status(200).send("UP");
});

const port = process.env.PORT || 3020;
app.listen(port, () => {
    console.log(`Servidor en ejecución en el puerto ${port}`);
});
