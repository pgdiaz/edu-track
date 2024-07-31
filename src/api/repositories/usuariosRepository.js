import db from '../configs/dbConfig.js'

class UsuariosRepository {

    static getAllBy(page, size, callback) {
        const offset = Math.max(0, (page - 1) * size);
        const query = 'SELECT SQL_CALC_FOUND_ROWS BIN_TO_UUID(id) as id, lastnames, names, email, role, status FROM usuarios LIMIT ? OFFSET ?';
        db.query(query, [size, offset], (err, results) => {
            if (err) return callback(err, null);
            db.query('SELECT FOUND_ROWS() as total', (err, totalResults) => {
                if (err) return callback(err, null);
                const total = totalResults[0].total;
                callback(null, {
                    result: results,
                    total: total,
                    page: page,
                    size: size
                });
            });
        });
    }

    static getBy(email, callback) {
        const query = 'SELECT BIN_TO_UUID(id) as id, lastnames, names, email, password, role, status FROM usuarios WHERE email = ?';
        db.query(query, [email], (err, results) => {
            if (err) return callback(err);
            callback(null, results[0]);
        });
    }

    static existsBy(email, callback) {
        const query = 'SELECT 1 FROM usuarios WHERE email = ? LIMIT 1';
        db.query(query, [email], (err, results) => {
            if (err) return callback(err);
            const exists = results.length > 0;
            callback(null, exists);
        });
    }

    static insert(id, lastnames, names, email, password, role, callback) {
        const userId = id ? `UUID_TO_BIN('${id}')` : 'UUID_TO_BIN(UUID())';
        const query = `
            INSERT INTO usuarios (id, lastnames, names, email, password, role, status)
            VALUES (${userId}, ?, ?, ?, ?, ?, 'activo')
        `;
        db.query(query, [lastnames, names, email, password, role ?? 'guest'], (err, results) => {
            if (err) return callback(err);
            callback(null, { affectedRows: results.affectedRows });
        });
    }

    static update(id, lastnames, names, email, role, callback) {
        const query = `
            UPDATE usuarios
            SET lastnames = ?, names = ?, email = ?, role = ?
            WHERE id = UUID_TO_BIN(?)
        `;
        db.query(query, [lastnames, names, email, role, id], (err, results) => {
            if (err) {
                return callback(err);
            }
            callback(null, { affectedRows: results.affectedRows });
        });
    }

    static delete(id, callback) {
        const query = 'DELETE FROM usuarios WHERE id = UUID_TO_BIN(?)';
        db.query(query, [id], (err, result) => {
            if (err) return callback(err);
            callback(null, { affectedRows: result.affectedRows });
        });
    }

}

export default UsuariosRepository;
