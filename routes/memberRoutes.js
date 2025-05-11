import express from 'express';
import {
    getMembers,
    getMemberById,
    createMember,
    updateMember,
    deleteMember,
    getMemberImage,
} from '../controllers/memberController.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.get('/', getMembers);
router.get('/:id', getMemberById);
router.get('/:id/image', getMemberImage);
router.post('/create/:userId', upload.single('image'), createMember);
router.put('/update/:id', updateMember);
router.delete('/delete/:id', deleteMember);

export default router;
