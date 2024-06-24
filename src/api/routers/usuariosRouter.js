import express from 'express';
import UsuariosController from '../controllers/usuariosController.js'

const UsuariosRouter = express.Router();
UsuariosRouter.use(express.json());
UsuariosRouter.get('/usuarios', UsuariosController.getAllBy);
UsuariosRouter.post('/usuarios', UsuariosController.register);
UsuariosRouter.post('/usuarios/login', UsuariosController.login);
UsuariosRouter.put('/usuarios/:id', UsuariosController.update);
UsuariosRouter.delete('/usuarios/:id', UsuariosController.delete)

export default UsuariosRouter;
