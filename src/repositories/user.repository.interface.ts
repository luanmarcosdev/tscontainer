import { User } from '../database/entities/user.entity'

export interface IUserRepository {
    getAll(): Promise<User[]>;
    findById(id: number): Promise<User | null>;
    findByEmail(email: string): Promise<User | null>;
    create(userData: { name: string; email: string; phone?: string }): Promise<User>;
    update(id: number, updateData: { name?: string; email?: string; phone?: string }): Promise<User>;
    delete(id: number): Promise<void>;
}