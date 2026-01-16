import { User } from "../database/entities/user.entity.js";
import { IUserRepository } from "../repositories/user.repository.interface.js";

export class UserService {
    
    constructor(private readonly userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    
    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }
}