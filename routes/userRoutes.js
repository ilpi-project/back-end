import express from 'express';
import {
    getUsers,
    getUserById,
    createUser,
    updateUser,
    deleteUser,
    login,
    validateUser,
    getUserImage,
} from '../controllers/userController.js';
import { upload } from '../config/multer.js';

const router = express.Router();

router.post('/login', login);
router.get('/validate-user', validateUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.get('/:id/image', getUserImage);
router.post('/create', upload.single('image'), createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
