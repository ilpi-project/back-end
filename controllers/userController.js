import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao buscar clientes', e });
    }
};
