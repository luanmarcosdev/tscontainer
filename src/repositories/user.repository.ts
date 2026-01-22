import { AppDataSource } from '../database/data-source';
import { User } from '../database/entities/user.entity';
import { IUserRepository } from './user.repository.interface';

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
    create(userData: { name: string; email: string; phone?: string; }): Promise<User> {
        throw new Error('Method not implemented.');
    }
    update(id: number, updateData: { name?: string; email?: string; phone?: string; }): Promise<User> {
        throw new Error('Method not implemented.');
    }
    delete(id: number): Promise<void> {
        throw new Error('Method not implemented.');
    }

}