import { AppDataSource } from '../database/data-source';
import { User } from '../database/entities/user.entity';
import { IUserRepository } from './user.repository.interface';

import { UserCreateDto } from "../dtos/user/create-user.dto.js";
import { UserResponseDto } from "../dtos/user/response-user.dto.js";
import { NotFoundError } from '../errors/not-found.error';

export class UserRepositoryMySQL implements IUserRepository {
    
    private UserRepositoryORM = AppDataSource.getRepository(User);

    getAll(): Promise<User[]> {
        return this.UserRepositoryORM.find();
    }
    
    findById(id: number): Promise<User | null> {
        return this.UserRepositoryORM.findOneBy({ id });
    }

    findByEmail(email: string): Promise<User | null> {
        return this.UserRepositoryORM.findOneBy({ email });
    }

    async create(userData: UserCreateDto): Promise<UserResponseDto> {
        const user = await this.UserRepositoryORM.save(userData);
        return {
            id: user.id,
            name: user.name,
            email: user.email
        };
    }

    update(id: number, updateData: { name?: string; email?: string; phone?: string; }): Promise<User> {
        throw new Error('Method not implemented.');
    }
    
    async delete(id: number): Promise<void> {
        const deleteOperation = await this.UserRepositoryORM.delete(id);
        if (deleteOperation.affected === 0) {
            throw new NotFoundError({ message: 'User not found' });
        }
        return;
    }

}