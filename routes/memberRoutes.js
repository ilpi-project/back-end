import express from 'express';
import { getMembers, getMemberById, createMember, updateMember, deleteMember } from '../controllers/memberController.js';

const router = express.Router();

router.get('/', getMembers);
router.get('/:id', getMemberById);
router.post('/create/:userId', createMember);
router.put('/update/:id', updateMember);
router.delete('/delete/:id', deleteMember);

export default router;
