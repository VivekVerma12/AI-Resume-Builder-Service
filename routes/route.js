import express from 'express'
import { getUserById, getUserResume, loginUser, registerUser } from '../controllers/userController';
import protect from '../middlewares/authMiddleware';

const route = express.Router();

route.post('/register', registerUser);
route.post('/login', loginUser);
route.get('/data', protect, getUserById);
route.get('/data', protect, getUserResume);


export default route