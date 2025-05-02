import User from '../models/User.js';
import dotenv from 'dotenv';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

dotenv.config();

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
