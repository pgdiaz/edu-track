import { randomId } from "@mui/x-data-grid-generator";

const users = [
    {
        id: randomId(),
        lastnames: 'Diaz',
        names: 'Pablo',
        email: 'admin@gmail.com',
        password: '$2a$10$vG6S8I0RayeOjQo/YNbkGuY.JK0TC2utVdOmRRULfRq9/7h2KaE6S',
        role: 'admin'
    },
];

class UsuariosService {

    static getAllBy(page, size, callback) {
        const paginatedRows = users.slice(page * size, page * size + size)
            .map(user => ({
                id: user.id,
                lastnames: user.lastnames,
                names: user.names,
                email: user.email,
                role: user.role,
            }));
        callback(null, {
            result: paginatedRows,
            total: users.length,
            page: page,
            size: size,
        });
    }

    static getBy(email, callback) {
        callback(null, users.find(user => user.email === email));
    }

    static save(id, lastnames, names, email, password, role, callback) {
        const user = {
            id: id ?? randomId(),
            lastnames: lastnames,
            names: names,
            email: email,
            password: password,
            role: role || 'guest',
        };
        users.unshift(user);
        callback(null, user);
    }

    static update(id, lastnames, names, email, role, callback) {
        const user = users.find(user => user.id === id);
        if (!user) {
            return callback(null, { affectedRows: 0 })
        }
        user.lastnames = lastnames;
        user.names = names;
        user.email = email;
        user.role = role;
        callback(null, { affectedRows: 1 });
    }

    static delete(id, callback) {
        const index = users.findIndex((user) => user.id === id);
        if (index !== -1) {
            users.splice(index, 1);
            return callback(null, { affectedRows: 1 })
        }
        callback(null, { affectedRows: 0 })
    };

}

export default UsuariosService;
