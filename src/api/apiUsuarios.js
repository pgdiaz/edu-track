import { randomId } from "@mui/x-data-grid-generator";
import bcrypt from 'bcryptjs';

const localStorageKey = 'usersTrack';

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
}

const register = async (input) => {
    const users = fetchUsers();
    if (users.some(user => user.email === input.email)) {
        throw new Error('El correo electrónico ya está registrado');
    }
    const hashedPassword = await bcrypt.hash(input.password, 10);
    saveUsers([...users, { id: randomId(), ...input, password: hashedPassword }])
}

export { register, login };
