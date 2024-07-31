/* eslint-disable no-undef */
import db from './dbConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || 'edutrack';

const createTableQuery = `
CREATE TABLE IF NOT EXISTS usuarios (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    lastnames VARCHAR(255) NOT NULL,
    names VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255),
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL
)
`;

const insertAdminQuery = `
INSERT INTO usuarios (lastnames, names, email, password, role, status)
VALUES ('Diaz', 'Pablo', 'admin@gmail.com', '$2a$10$vG6S8I0RayeOjQo/YNbkGuY.JK0TC2utVdOmRRULfRq9/7h2KaE6S', 'admin', 'activo')
ON DUPLICATE KEY UPDATE email=email
`;

const initializeDatabase = () => {
    return new Promise((resolve, reject) => {
        db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
            if (err) {
                return reject(err);
            }
            console.log(`Database ${dbName} created or already exists`);
            db.changeUser({ database: dbName }, (err) => {
                if (err) {
                    return reject(err);
                }
                db.query(createTableQuery, (err) => {
                    if (err) {
                        return reject(err);
                    }
                    console.log('Table usuarios created or already exists');
                    db.query(insertAdminQuery, (err, results) => {
                        if (err) {
                            return reject(err);
                        }
                        console.log('Default admin user inserted or already exists');
                        resolve(results);
                    });
                });
            });
        });
    });
};

export default initializeDatabase;
