import express from 'express';
import { UserController } from '../controllers/user.controller';

const router = express.Router();
const controller = new UserController();

router.get('/users', (req, res) => controller.getAllUsers(req, res));

export default router;