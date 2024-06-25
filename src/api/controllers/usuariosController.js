import UsuariosService from '../services/usuariosService.js';
import bcrypt from 'bcryptjs';

class UsuariosController {

    static getAllBy(req, res) {
        const page = parseInt(req.query.page) || 0;
        const size = parseInt(req.query.size) || 5;
        UsuariosService.getAllBy(page, size, (err, data) => {
            if (err) {
                return res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
            }
            res.json(data);
        });
    }

    static register(req, res) {
        const { lastnames, names, email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('El correo electrónico y la contraseña son obligatorios');
        }
        UsuariosService.getBy(email, async (err, data) => {
            if (err) {
                return res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
            }
            if (data.user) {
                return res.status(400).json({ fecha: new Date().toISOString(), error: 'El correo electrónico ya está registrado' });
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            UsuariosService.save(lastnames, names, email, hashedPassword, (err, data) => {
                if (err) {
                    return res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
                }
                res.send({
                    id: data.id,
                    lastnames: data.lastnames,
                    names: data.names,
                    email: data.email,
                });
            });
        });
    }

    static login(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).send('El correo electrónico y la contraseña son obligatorios');
        }
        UsuariosService.getBy(email, async (err, data) => {
            if (err) {
                return res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
            }
            if (!data.user) {
                return res.status(400).json({ fecha: new Date().toISOString(), error: 'El correo electrónico no está registrado' });
            }
            const isValid = await bcrypt.compare(password, data.user.password);
            if (!isValid) {
                return res.status(400).json({ fecha: new Date().toISOString(), error: 'La contraseña es incorrecta' });
            }
            res.send({
                id: data.user.id,
                lastnames: data.user.lastnames,
                names: data.user.names,
                role: data.user.role || 'guest'
            });
        });
    }

    static update(req, res) {
        const { id } = req.params;
        const { lastnames, names, email, role } = req.body;
        if (!id) {
            return res.status(400).send('El id es obligatorio');
        }
        if (!email) {
            return res.status(400).send('El correo electrónico es obligatorio');
        }
        UsuariosService.update(id, lastnames, names, email, role, (err, data) => {
            if (err) {
                return res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ fecha: new Date().toISOString(), error: 'Usuario no encontrado' });
            }
            res.status(204).json({ message: 'Usuario actualizado con éxito' });
        });
    }

    static delete(req, res) {
        const id = parseInt(req.params.id);
        if (!id) {
            return res.status(400).send('El id es obligatorio');
        }
        UsuariosService.delete(id, (err, data) => {
            if (err) {
                return res.status(500).json({ fecha: new Date().toISOString(), error: err.message });
            }
            if (data.affectedRows === 0) {
                return res.status(404).json({ fecha: new Date().toISOString(), error: 'Usuario no encontrado' });
            }
            res.status(204).json({ message: 'Usuario eleminado con éxito' });
        });
    }

}

export default UsuariosController;
