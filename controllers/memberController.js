import Member from '../models/Member.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getMemberById = async (req, res) => {
    const { id } = req.params;
    try {
        const member = await Member.findById(id).select('-image');
        if (!member) {
            return res.status(404).json({ message: 'Membro não encontrado' });
        }
        return res.status(200).json(member);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao buscar membro', e });
    }
};

export const getMemberImage = async (req, res) => {
    const { id } = req.params;
    try {
        const member = await Member.findById(id);
        if (!member || !member.image || !member.image.data) {
            return res.status(404).json({ message: 'Imagem não encontrada' });
        }
        res.set('Content-Type', member.image.contentType);
        return res.send(member.image.data);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao buscar imagem', e });
    }
};

export const getMembers = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const members = await Member.find({ user: decoded.userId }).select('-image');
        res.status(200).json(members);
    } catch (e) {
        res.status(401).json({ message: 'Token inválido ou expirado' });
    }
};

export const createMember = async (req, res) => {
    const { userId } = req.params;
    const member = { ...req.body, user: userId };

    if (req.file) {
        member.image = { data: req.file.buffer, contentType: req.file.mimetype };
    }

    try {
        const newMember = await Member.create(member);
        return res.status(201).json(newMember);
    } catch (e) {
        if (e.code === 11000) {
            const duplicatedField = Object.keys(e.keyValue);
            return res.status(400).json({ message: `${duplicatedField} já está cadastrado` });
        }
        return res.status(500).json({ message: 'Erro ao criar membro', e });
    }
};

export const updateMember = async (req, res) => {
    const { id } = req.params;
    const data = req.body;
    try {
        const updatedMember = await Member.findByIdAndUpdate(id, data, {
            new: true,
        }).select('-image');
        if (!updatedMember) {
            return res.status(404).json({ message: 'Membro não encontrado.' });
        }
        return res.status(200).json(updatedMember);
    } catch (e) {
        if (e.code === 11000) {
            const duplicatedField = Object.keys(e.keyValue);
            return res.status(400).json({ message: `${duplicatedField} já está cadastrado` });
        }
        return res.status(500).json({ message: 'Erro ao atualizar membro', e });
    }
};

export const deleteMember = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedMember = await Member.findByIdAndDelete(id);
        if (!deletedMember) {
            return res.status(404).json({ message: 'Membro não encontrado.' });
        }
        return res.status(200).json({ message: 'Membro deletado com sucesso.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao deletar membro.', e });
    }
};
