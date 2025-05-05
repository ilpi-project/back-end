import express from 'express';
import { createEvent, deleteEvent, getEvent, getEventById } from '../controllers/eventController.js';

const router = express.Router();

router.get('/', getEvent);
router.get('/:id', getEventById);
router.post('/create/:userId', createEvent);
router.delete('/delete/:id', deleteEvent);

export default router;
