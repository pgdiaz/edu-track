/* eslint-disable no-undef */
import db from './dbConfig.js';
import dotenv from 'dotenv';

dotenv.config();

const dbName = process.env.DB_NAME || 'edutrack';

const createDatabase = () => {
    return new Promise((resolve, reject) => {
        db.query(`CREATE DATABASE IF NOT EXISTS ${dbName}`, (err) => {
            if (err) return reject(err);
            console.log(`Database ${dbName} created or already exists`);
            db.changeUser({ database: dbName }, (err) => {
                if (err) return reject(err);
                resolve();
            });
        });
    });
};

const createTable = (query, tableName) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err) => {
            if (err) return reject(err);
            console.log(`Table ${tableName} created or already exists`);
            resolve();
        });
    });
};

const insertInitialData = (query, description) => {
    return new Promise((resolve, reject) => {
        db.query(query, (err, results) => {
            if (err) return reject(err);
            console.log(`${description} inserted or already exists`);
            resolve(results);
        });
    });
};

const createUsuariosTableQuery = `
CREATE TABLE IF NOT EXISTS usuarios (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    lastnames VARCHAR(255) NOT NULL,
    names VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) DEFAULT NULL,
    role VARCHAR(50) NOT NULL,
    status VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL,
    UNIQUE (email, status)
)
`;

const createProfesoresTableQuery = `
CREATE TABLE IF NOT EXISTS profesores (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BINARY(16) NOT NULL,
    departamento VARCHAR(255) DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
)
`;

const createAlumnosTableQuery = `
CREATE TABLE IF NOT EXISTS alumnos (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    usuario_id BINARY(16) NOT NULL,
    edad INTEGER DEFAULT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL,
    FOREIGN KEY (usuario_id) REFERENCES usuarios(id)
)
`;

const createMateriasTableQuery = `
CREATE TABLE IF NOT EXISTS materias (
    codigo VARCHAR(50) PRIMARY KEY,
    descripcion VARCHAR(255) NOT NULL,
    profesor_id BIGINT DEFAULT NULL,
    estado VARCHAR(50) NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL,
    FOREIGN KEY (profesor_id) REFERENCES profesores(id)
)
`;

const createCalificacionesTableQuery = `
CREATE TABLE IF NOT EXISTS calificaciones (
    id BINARY(16) PRIMARY KEY DEFAULT (UUID_TO_BIN(UUID())),
    alumno_id BIGINT NOT NULL,
    materia_id VARCHAR(50) NOT NULL,
    calificacion DECIMAL(5,2) NOT NULL,
    tipo_evaluacion VARCHAR(50) NOT NULL,
    fecha DATETIME NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    updated_at DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    deleted_at DATETIME DEFAULT NULL,
    FOREIGN KEY (alumno_id) REFERENCES alumnos(id),
    FOREIGN KEY (materia_id) REFERENCES materias(codigo)
)
`;

const insertAdminQuery = `
INSERT INTO usuarios (lastnames, names, email, password, role, status)
VALUES ('Diaz', 'Pablo', 'admin@gmail.com', '$2a$10$vG6S8I0RayeOjQo/YNbkGuY.JK0TC2utVdOmRRULfRq9/7h2KaE6S', 'admin', 'activo')
ON DUPLICATE KEY UPDATE 
    lastnames=VALUES(lastnames), 
    names=VALUES(names), 
    password=VALUES(password), 
    role=VALUES(role), 
    status=VALUES(status),
    deleted_at=NULL
`;

const insertUsuariosQuery = `
INSERT INTO usuarios (lastnames, names, email, role, status)
VALUES ('Snow', 'Jon', 'snowjon@gmail.com', 'alumno', 'activo'),
('Lannister', 'Cersei', 'malalala@gmail.com', 'alumno', 'activo'),
('Lannister', 'Jaime', 'jmanco@gmail.com', 'alumno', 'activo'),
('Stark', 'Arya', 'thebest@gmail.com', 'alumno', 'activo'),
('Targaryen', 'Daenerys', 'drakaris@gmail.com', 'alumno', 'activo'),
('Melisandre', 'Nataly', 'brujita@gmail.com', 'alumno', 'activo'),
('Clifford', 'Ferrara', 'clife@gmail.com', 'alumno', 'activo'),
('Frances', 'Rossini', 'frenchi@gmail.com', 'alumno', 'activo'),
('Roxie', 'Harvey', 'harox@gmail.com', 'alumno', 'activo'),
('Romero', 'Carlos', 'tuco@gmail.com', 'guest', 'activo'),
('Maravilla', 'Alicia', 'malva@gmail.com', 'guest', 'activo')
ON DUPLICATE KEY UPDATE 
    lastnames=VALUES(lastnames), 
    names=VALUES(names), 
    role=VALUES(role), 
    status=VALUES(status),
    deleted_at=NULL
`;

const insertAlumnosQuery = `
INSERT INTO alumnos (id, usuario_id, edad)
VALUES 
    (1, (SELECT id FROM usuarios WHERE email = 'snowjon@gmail.com'), 20),
    (2, (SELECT id FROM usuarios WHERE email = 'malalala@gmail.com'), 22),
    (3, (SELECT id FROM usuarios WHERE email = 'jmanco@gmail.com'), 21),
    (4, (SELECT id FROM usuarios WHERE email = 'thebest@gmail.com'), 19),
    (5, (SELECT id FROM usuarios WHERE email = 'drakaris@gmail.com'), 23),
    (6, (SELECT id FROM usuarios WHERE email = 'brujita@gmail.com'), 24),
    (7, (SELECT id FROM usuarios WHERE email = 'clife@gmail.com'), 20),
    (8, (SELECT id FROM usuarios WHERE email = 'frenchi@gmail.com'), 22),
    (9, (SELECT id FROM usuarios WHERE email = 'harox@gmail.com'), 21)
ON DUPLICATE KEY UPDATE edad=VALUES(edad)
`;

const insertProfesoresQuery = `
INSERT INTO profesores (id, usuario_id, departamento)
VALUES 
    (1, (SELECT id FROM usuarios WHERE email = 'tuco@gmail.com'), 'Informatica'),
    (2, (SELECT id FROM usuarios WHERE email = 'malva@gmail.com'), 'Informatica')
ON DUPLICATE KEY UPDATE departamento=VALUES(departamento)
`;

const insertMateriasQuery = `
INSERT INTO materias (codigo, descripcion, estado)
VALUES 
    ('PRAMOV3', 'Programación de Dispositivos Móviles III', 'activo'),
    ('PRAWEB3', 'Programación de Aplicaciones Web III', 'activo'),
    ('CEYM', 'Comercio Electrónico y Marketing Digital', 'activo')
ON DUPLICATE KEY UPDATE descripcion=VALUES(descripcion), estado=VALUES(estado)
`;

const insertCalificacionesQuery = `
INSERT INTO calificaciones (id, alumno_id, materia_id, calificacion, tipo_evaluacion, fecha)
VALUES 
    (UUID_TO_BIN('0CA0C13E-4F82-11EF-A0F7-0242AC110002'), 1, 'PRAMOV3', 6, 'Primer Parcial', '2024-04-26 10:00:00'),
    (UUID_TO_BIN('0CA0D8D8-4F82-11EF-A0F7-0242AC110002'), 2, 'PRAWEB3', 1, 'Primer Parcial', '2024-04-26 10:00:00'),
    (UUID_TO_BIN('0D3DD646-4F81-11EF-A0F7-0242AC110002'), 3, 'PRAMOV3', 7, 'Primer Parcial', '2024-04-26 10:00:00'),
    (UUID_TO_BIN('0D3DFE1B-4F81-11EF-A0F7-0242AC110002'), 4, 'PRAWEB3', 5, 'Primer Parcial', '2024-04-26 10:00:00'),
    (UUID_TO_BIN('52C7BF54-4F80-11EF-A0F7-0242AC110002'), 5, 'CEYM', 8, 'Primer Parcial', '2024-04-26 10:00:00'),
    (UUID_TO_BIN('52C8095B-4F80-11EF-A0F7-0242AC110002'), 6, 'PRAWEB3', 7, 'Primer Parcial', '2024-04-26 10:00:00'),
    (UUID_TO_BIN('A2AF5B94-4F81-11EF-A0F7-0242AC110002'), 7, 'PRAWEB3', 0, 'Primer Parcial', '2024-04-26 10:00:00'),
    (UUID_TO_BIN('A2AF7E65-4F81-11EF-A0F7-0242AC110002'), 8, 'PRAMOV3', 5, 'Primer Parcial', '2024-04-26 10:00:00'),
    (UUID_TO_BIN('0CA0D038-4F82-11EF-A0F7-0242AC110002'), 9, 'CEYM', 3, 'Primer Parcial', '2024-04-26 10:00:00'),
    (UUID_TO_BIN('0CA0D9C0-4F82-11EF-A0F7-0242AC110002'), 1, 'PRAMOV3', 7, 'Segundo Parcial', '2024-06-28 10:00:00'),
    (UUID_TO_BIN('0D3DEEA5-4F81-11EF-A0F7-0242AC110002'), 2, 'PRAWEB3', 5, 'Segundo Parcial', '2024-06-28 10:00:00'),
    (UUID_TO_BIN('0D3DFF1A-4F81-11EF-A0F7-0242AC110002'), 3, 'PRAMOV3', 3, 'Segundo Parcial', '2024-06-28 10:00:00'),
    (UUID_TO_BIN('52C7FFD9-4F80-11EF-A0F7-0242AC110002'), 4, 'PRAWEB3', 9, 'Segundo Parcial', '2024-06-28 10:00:00'),
    (UUID_TO_BIN('52C80C16-4F80-11EF-A0F7-0242AC110002'), 5, 'CEYM', 3, 'Segundo Parcial', '2024-06-28 10:00:00')
ON DUPLICATE KEY UPDATE calificacion=VALUES(calificacion), tipo_evaluacion=VALUES(tipo_evaluacion), fecha=VALUES(fecha)
`;

const initializeDatabase = async () => {
    try {
        await createDatabase();
        await createTable(createUsuariosTableQuery, 'usuarios');
        await createTable(createProfesoresTableQuery, 'profesores');
        await createTable(createAlumnosTableQuery, 'alumnos');
        await createTable(createMateriasTableQuery, 'materias');
        await createTable(createCalificacionesTableQuery, 'calificaciones');
        await insertInitialData(insertAdminQuery, 'Default admin user');
        await insertInitialData(insertUsuariosQuery, 'Usuarios');
        await insertInitialData(insertAlumnosQuery, 'Alumnos');
        await insertInitialData(insertProfesoresQuery, 'Profesores');
        await insertInitialData(insertMateriasQuery, 'Materias');
        await insertInitialData(insertCalificacionesQuery, 'Calificaciones');
    } catch (err) {
        console.error('Error initializing database:', err);
        throw new Error('Database initialization complete');
    }
};

export default initializeDatabase;
