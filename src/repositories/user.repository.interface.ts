import { User } from '../database/entities/user.entity'
import { UserCreateDto } from "../dtos/user/create-user.dto.js";
import { UserResponseDto } from "../dtos/user/response-user.dto.js";

export interface IUserRepository {
    getAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userData: UserCreateDto): Promise<UserResponseDto>;
    update(id: number, updateData: { name?: string; email?: string; phone?: string }): Promise<User>;
    delete(id: number): Promise<void>;
}