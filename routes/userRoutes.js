import express from 'express';
import { getUsers, getUserById, createUser, updateUser, deleteUser, login, validateUser } from '../controllers/userController.js';

const router = express.Router();

router.post('/login', login);
router.get('/validate-user', validateUser);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.post('/create', createUser);
router.put('/update/:id', updateUser);
router.delete('/delete/:id', deleteUser);

export default router;
