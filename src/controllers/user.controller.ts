import { UserRepositoryMySQL } from '../repositories/user.repository';
import { UserService } from '../services/user.service';
import { Request, Response, NextFunction } from 'express';
import { UserCreateDto } from "../dtos/user/create-user.dto";
import { validate } from "class-validator";
import { IResponse } from '../models/response.interface';
import { UserResponseDto } from '../dtos/user/response-user.dto';
import { BadRequestError } from '../errors/bad-request.error';

const repository = new UserRepositoryMySQL();
const service = new UserService(repository);

export class UserController {

    async getAllUsers(req: Request, res: Response) {
        try {
            const users = await service.getAll();

            const usersDto: UserResponseDto[] = users.map((user) => {
                return {
                    id: user.id,
                    name: user.name,
                    email: user.email
                };
            })

            const response: IResponse<UserResponseDto> = {
                status: 200,
                message: 'Users retrieved successfully',
                data: usersDto
            };

            res.status(200).json(response);
        } catch (error) {
            res.status(500).json({ message: error instanceof Error ? error.message : 'Internal server error' });
        }
    }

    async createUser(req: Request, res: Response, next: NextFunction) {
        try {
            const dto = Object.assign(new UserCreateDto(), req.body);
            const errors = await validate(dto);
            
            if (errors.length) {
                throw new BadRequestError({ message: 'Validation failed', errors });
            }

            const result = await service.create(dto);

            const user: UserResponseDto = {
                id: result.id,
                name: result.name,
                email: result.email
            };

            const response: IResponse<UserResponseDto> = {
                status: 201,
                message: 'User created successfully',
                data: user
            };
            
            res.status(201).json(response);
        } catch (error) {
            next(error);
        }
    }

    async findUser(req: Request, res: Response, next: NextFunction) {
        try {
            const userId = parseInt(req.params.id, 10);
            const user = await service.findById(userId);

            const userDto: UserResponseDto = {
                id: user!.id,
                name: user!.name,
                email: user!.email
            };

            const response: IResponse<UserResponseDto> = {
                status: 200,
                message: 'User retrieved successfully',
                data: userDto
            };

            res.status(200).json(response);
        } catch (error) {
            next(error);
        }
    }

}