import { randomId } from "@mui/x-data-grid-generator";
import bcrypt from 'bcryptjs';

const localStorageKey = 'usersTrack';

const adminUser = {
    lastnames: 'Diaz',
    names: 'Pablo',
    email: 'admin@gmail.com',
    password: 'Admin2024*',
    role: 'admin'
};

const load = async () => {
    const users = fetchUsers();
    if (!users.some(user => user.role === 'admin')) {
        register(adminUser);
    }
}

const fetchUsers = () => {
    const storedRows = localStorage.getItem(localStorageKey);
    return JSON.parse(storedRows) || [];
};

const saveUsers = (users) => {
    localStorage.setItem(localStorageKey, JSON.stringify(users));
}

const login = async (input) => {
    const users = fetchUsers();
    const user = users.find(user => user.email === input.email);
    if (!user) {
        throw new Error('El correo electrónico no está registrado');
    }
    const isValid = await bcrypt.compare(input.password, user.password);
    if (!isValid) {
        throw new Error('La contraseña es incorrecta');
    }
    return user.role ?? 'guest';
}

const register = async (input) => {
    const users = fetchUsers();
    if (users.some(user => user.email === input.email)) {
        throw new Error('El correo electrónico ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);
    saveUsers([...users, { id: randomId(), ...input, password: hashedPassword }])
}

const get = (page, pageSize) => {
    page = page ?? 0;
    pageSize = pageSize ?? 5;
    const users = fetchUsers();
    const paginatedRows = users.slice(page * pageSize, page * pageSize + pageSize);
    return {
        result: paginatedRows,
        total: users.length,
        page: page,
        size: pageSize,
    };
}

const save = (newUser) => {
    const users = fetchUsers();
    const updatedUsers = users.some(user => user.id === newUser.id)
        ? users.map(user => user.id === newUser.id ? newUser : user)
        : [newUser, ...users];
    saveUsers(updatedUsers);
}

const remove = (selectedIds) => {
    const users = fetchUsers();
    const updatedUsers = users.filter((user) => !selectedIds.includes(user.id));
    saveUsers(updatedUsers);
};

export { register, login, load, get, save, remove };
