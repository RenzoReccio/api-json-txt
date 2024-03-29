import { Inject } from "@nestjs/common";
import { UserRepository } from "src/domain/repository/user.repository";
import { BaseUseCase } from "../../base/base.usecase";
import { CreateUserDto } from "./createUser.dto";
import { UserModel } from "src/domain/model/user.model";
import { isAlpha, isEmail, isString, minLength } from "class-validator";
import { ValidationError } from "../error/validation.error";

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
        if(!dto.name || dto.name.trim().length == 0) throw new Error("Name is obligatory.")
        if(!dto.email || dto.email.trim().length == 0) throw new Error("Email is obligatory.")

        //trim strings
        dto.name = dto.name.trim()
        dto.email = dto.email.trim()
        dto.address = dto.address?.trim()
        
        if(!isString(dto.name)) throw new ValidationError("Name is not a string.")
        if(!minLength(dto.name, 6)) throw new ValidationError("Name min length is 6.")
        if(!isAlpha(dto.name)) throw new ValidationError("Name contains special characters.")

        if(!isString(dto.email)) throw new ValidationError("Email is not a string.")
        if(!isEmail(dto.email)) throw new ValidationError("Email is not in the correct format.")

        if(dto.address && !isString(dto.address)) throw new ValidationError("Address is not a string.")

        let validateUser = await this._userRepository.getByEmail(dto.email);
        if(validateUser) throw new ValidationError(`User with email: ${dto.email} already exists.`)
    }
}