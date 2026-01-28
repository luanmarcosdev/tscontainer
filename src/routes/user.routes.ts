import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const controller = new UserController();

router.get('/users', controller.getAllUsers.bind(controller));
router.post('/users', controller.createUser.bind(controller));

export default router;