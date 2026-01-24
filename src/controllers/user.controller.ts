import { UserRepositoryMySQL } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { Request, Response } from 'express';
import { UserCreateDto } from "../dtos/user/create-user.dto";
import { validate } from "class-validator";


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

    async createUser(req: Request, res: Response) {
        try {
            const dto = Object.assign(new UserCreateDto(), req.body);
            const errors = await validate(dto);
            
            if (errors.length) {
                return res.status(400).json({ message: 'Validation failed', errors });
            }

            const result = await service.create(dto);
            res.status(201).json(result);
        } catch (error) {
            res.status(500).json({ message: 'Internal server error' });
        }
    }

}