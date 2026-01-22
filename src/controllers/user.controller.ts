import { UserRepositoryMySQL } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';

const repository = new UserRepositoryMySQL();
const service = new UserService(repository);

export class UserController {

    async getAllUsers(req: Request, res: Response): Promise<void> {
        try {
            const users = await service.getAll();
            res.status(200).json(users);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}