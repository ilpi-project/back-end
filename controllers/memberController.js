import Member from '../models/Member.js';

export const getMemberById = async (req, res) => {
    const { id } = req.params;
    try {
        const member = await Member.findById(id);
        if (!member) {
            return res.status(404).json({ message: 'Membro não encontrado' });
        }
        return res.status(200).json(member);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao buscar membro', e });
    }
};

export const getMembers = async (req, res) => {
    try {
        const members = await Member.find();
        return res.status(200).json(members);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao buscar membros: ', e });
    }
};

export const createMember = async (req, res) => {
    const { userId } = req.params;
    const member = { ...req.body, user: userId };
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
        });
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
