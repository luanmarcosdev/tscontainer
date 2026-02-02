import { User } from "../database/entities/user.entity";
import { IUserRepository } from "../repositories/user.repository.interface";
import { UserCreateDto } from "../dtos/user/create-user.dto";
import { UserResponseDto } from "../dtos/user/response-user.dto";
import { ConflictError } from "../errors/conflict.error";
import { NotFoundError } from "../errors/not-found.error";
import { BadRequestError } from "../errors/bad-request.error";
import { UserUpdateDto } from "../dtos/user/update-user.dto";

export class UserService {
    
    constructor(private readonly userRepository: IUserRepository) {
        this.userRepository = userRepository;
    }
    
    async getAll(): Promise<User[] | null> {
        const users = await this.userRepository.getAll();

        if (!users || users.length === 0) {
            throw new NotFoundError({ message: "No users found" });
        }

        return users;
    }

    async create(data: UserCreateDto): Promise<UserResponseDto> {
        const existingUser = await this.userRepository.findByEmail(data.email);
        
        if (existingUser) {
            throw new ConflictError({message: "Email already in use"});
        }
        
        const user = await this.userRepository.create(data);
        return user;
    }

    async findById(id: number): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        
        if (!user || !user.id ) {
            throw new NotFoundError({message: "User not found"});
        }

        return user;
    }

    async update(id: number, data: Partial<UserCreateDto>): Promise<User | null> {
        const user = await this.userRepository.findById(id);
        
        if (!user || !user.id ) {
            throw new NotFoundError({message: "User not found"});
        }

        if (!data.name && !data.email) {
            throw new BadRequestError({message: "No data provided for update"});
        }

        const dataToUpdate: UserUpdateDto = {
            name: data.name,
            phone: data.phone
        };

        const updatedUser = await this.userRepository.update(id, dataToUpdate);
        return updatedUser;
    }

    async delete(id: number): Promise<void> {
        const user = await this.userRepository.findById(id);
        
        if (!user || !user.id ) {
            throw new NotFoundError({message: "User not found"});
        }

        await this.userRepository.delete(id);
    }
}