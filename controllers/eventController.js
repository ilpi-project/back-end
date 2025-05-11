import Event from '../models/Event.js';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export const getEventById = async (req, res) => {
    const { id } = req.params;
    try {
        const event = await Event.findById(id);
        if (!event) {
            return res.status(404).json({ message: 'Evento não encontrado' });
        }
        return res.status(200).json(event);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao buscar evento', e });
    }
};

export const getEvents = async (req, res) => {
    const token = req.headers['authorization']?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Token não fornecido' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        const events = await Event.find({ user: decoded.userId });
        return res.status(200).json(events);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao buscar eventos: ', error: e.message });
    }
};

export const createEvent = async (req, res) => {
    const { userId } = req.params;
    const event = { ...req.body, user: userId };
    try {
        const newEvent = await Event.create(event);
        return res.status(201).json(newEvent);
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao criar evento', e });
    }
};

export const deleteEvent = async (req, res) => {
    const { id } = req.params;
    try {
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) {
            return res.status(404).json({ message: 'Evento não encontrado.' });
        }
        return res.status(200).json({ message: 'Evento deletado com sucesso.' });
    } catch (e) {
        return res.status(500).json({ message: 'Erro ao deletar evento.', e });
    }
};
