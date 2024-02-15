import { Inject } from "@nestjs/common";
import { UserRepository } from "src/domain/repository/user.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { CreateUserDto } from "./createUser.dto";
import { UserModel } from "src/domain/model/user.model";
import { isAlpha, isEmail, minLength } from "class-validator";

export class CreateUserUseCase implements BaseUseCase<CreateUserDto, string>{

    constructor(
        @Inject('UserRepository') private _userRepository: UserRepository,
    ) {}
    
    async get(dto?: CreateUserDto): Promise<string> {
        await this.validation(dto)
        let user = new UserModel(dto.name, dto.email, dto.address)
        await this._userRepository.create(user)
        return `User: ${user.name} created succesfully.` 
    }

    private async validation(dto?: CreateUserDto): Promise<void>{
        if(!dto.name || dto.name.trim()) throw new Error("Name is obligatory.")
        if(!dto.email || dto.email.trim()) throw new Error("Email is obligatory.")

        //trim strings
        dto.name = dto.name.trim()
        dto.email = dto.name.trim()
        dto.address = dto.address?.trim()
        
        if(minLength(dto.name, 6)) throw new Error("Name min length is 6.")
        if(isAlpha(dto.name)) throw new Error("Name contains special characters.")

        if(isEmail(dto.email)) throw new Error("Email is not in the correct format.")

        let validateUser = await this._userRepository.getByEmail(dto.email);
        if(validateUser) throw new Error(`User with email: ${dto.email} already exists.`)
    }
}