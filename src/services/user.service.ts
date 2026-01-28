import { User } from "../database/entities/user.entity";
import { IUserRepository } from "../repositories/user.repository.interface";
import { UserCreateDto } from "../dtos/user/create-user.dto";
import { UserResponseDto } from "../dtos/user/response-user.dto";
import { ConflictError } from "../errors/conflict.error";

export class UserService {
    
    constructor(private readonly userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    
    async getAll(): Promise<User[]> {
        return this.userRepository.getAll();
    }

    async create(data: UserCreateDto): Promise<UserResponseDto> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        
        if (existingUser) {
            throw new ConflictError({message: "Email already in use"});
        }
        
        const user = await this.userRepository.create(data);
        return user;
    }
}