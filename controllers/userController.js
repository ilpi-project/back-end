import User from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

export const validateUser = async (req, res) => {
    const token = req.headers["authorization"]?.split(" ")[1];

    if (!token) {
        return res.status(401).json({ message: "Token não fornecido" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const user = await User.findById(decoded.userId);
        if (!user) {
            return res.status(404).json({ message: "Usuário não encontrado" });
        }
        res.status(200).json({ name: user.name });
    } catch (e) {
        return res.status(401).json({ message: "Token inválido ou expirado" });
    }
};

export const login = async (req, res) => {
    const { email, password } = req.body;
    try {
        const user = await User.findOne({ email });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            return res.status(400).json({ message: "Credenciais inválidas" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
            expiresIn: "12h",
        });
        res.json({ userId: user._id, token });
    } catch (e) {
        res.status(500).json({ message: "Erro ao realizar login: ", e });
    }
};

export const getUserById = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ message: 'Usuário não encontrado' });
        }
        return res.status(200).json(user);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao buscar usuário', e });
    }
};

export const getUsers = async (req, res) => {
    try {
        const users = await User.find();
        return res.status(200).json(users);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao buscar usuários', e });
    }
};

export const createUser = async (req, res) => {
    const { password, ...rest } = req.body;
    try {
        const saltRounds = 10;
        const passwordHash = await bcrypt.hash(password, saltRounds);
        const newUser = await User.create({ password: passwordHash, ...rest });
        return res.status(201).json(newUser);
    } catch (e) {
        if (e.code === 11000) {
            const duplicatedField = Object.keys(e.keyValue);
            return res.status(400).json({ message: `${duplicatedField} já está cadastrado` });
        }
        return res.status(500).json({ message: 'Erro ao criar usuário', e });
    }
};

export const updateUser = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(id, data, {
            new: true,
        });
        if (!updatedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        return res.status(200).json(updatedUser);
    } catch (e) {
        if (e.code === 11000) {
            const duplicatedField = Object.keys(e.keyValue);
            return res.status(400).json({ message: `${duplicatedField} já está cadastrado` });
        }
        return res.status(500).json({ message: 'Erro ao atualizar usuário', e });
    }
};

export const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedUser = await User.findByIdAndDelete(id);
        if (!deletedUser) {
            return res.status(404).json({ message: 'Usuário não encontrado.' });
        }
        return res.status(200).json({ message: 'Usuário deletado com sucesso.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao deletar usuário.', e });
    }
};
